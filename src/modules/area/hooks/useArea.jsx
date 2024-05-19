import { useState } from "react";
import { searchByField } from "../../utils/library/application";
import { alertMessage } from "../../utils/library/alertMessage";
import { AREA, SERVER_URL } from "../../utils/Constants";

export const useArea = () => {
  
  const initialDatestoAdd = {
    area_name: "",
  };

  const initialDatestoUpdate = {
    area_name: "",
    state: "",
  };

  const [dataAdd, setDataAdd] = useState(initialDatestoAdd);

  const [dataUpdate, setDataUpdate] = useState(initialDatestoUpdate);

  const [areas, setAreas] = useState([]);

  const loadAreas = async () => {
    const response = await fetch(`${SERVER_URL + AREA.GETLIST}`);
    const data = await response.json();
    setAreas(data);
    // console.log(data);
  };

  const deleteArea = async (id) => {
    // console.log(id);
    Swal.fire({
      title: "¿Está seguro de eliminar esta área?",
      text: "¡No podrá revertir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#28A745",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await fetch(`${SERVER_URL + AREA.DELETE + id}`, {
          method: "DELETE",
        });
        setAreas(areas.filter((area) => area.id !== id));
        console.log(areas);
        alertMessage(
          "¡Eliminación exitosa!",
          "El área has sido eliminada",
          "success",
          "OK",
          "#28A745"
        );
      }
    });
  };

  const addArea = async () => {
    try {
      //fix bug of one character
      if (dataAdd.area_name.length < 2) {
        throw new Error("Ingrese más de un caracter");
      }

      //validation: repeated element
      if (
        !searchByField(areas, "area_name", dataAdd.area_name) &&
        !dataAdd.area_name == ""
      ) {
        const response = await fetch(`${SERVER_URL + AREA.CREATE}`, {
          method: "POST",
          body: JSON.stringify(dataAdd),
          headers: { "Content-Type": "application/json" },
        });
        //we show the confirmed modal
        alertMessage(
          "Registro exitoso!",
          "El área ha sido registrada",
          "success",
          "OK",
          "#28A745"
        );
      } else {
        throw new Error("El área ingresada ya existe");
      }
    } catch (error) {
      alertMessage("Error!", error, "error", "OK", "#d33");
      console.log(error);
    }

    // change the state table
    loadAreas();

    // reset el object
    setDataAdd(initialDatestoAdd);
  };

  const updateArea = async (id) => {
    try {
      if (
        !searchByField(areas, "area_name", dataUpdate.area_name) &&
        !dataUpdate.area_name == ""
      ) {
        const response = await fetch(`${SERVER_URL + AREA.UPDATE + id}`, {
          method: "PUT",
          body: JSON.stringify(dataUpdate),
          headers: { "Content-Type": "application/json" },
        });
        //we show the confirmed modal
        alertMessage(
          "Modificación exitoso!",
          "La área ha sido modificado",
          "success",
          "OK",
          "#28A745"
        );
      } else {
        throw new Error("El área ingresada ya existe");
      }
    } catch (error) {
      alertMessage("Error!", error, "error", "OK", "#d33");
      console.log(error);
    }

    // change the state table
    loadAreas();
  };

  const getArea = async (id) => {
    // console.log(id);
    try {
      const response = await fetch(`${SERVER_URL + AREA.GET + id}`);
      const data = await response.json();
      setDataUpdate(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    dataAdd,
    setDataAdd,
    dataUpdate,
    setDataUpdate,
    areas,
    setAreas,
    loadAreas,
    addArea,
    getArea,
    updateArea,
    deleteArea,
  };
};

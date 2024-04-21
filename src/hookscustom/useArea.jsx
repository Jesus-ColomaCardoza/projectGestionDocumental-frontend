import { useState } from 'react'

export const useArea = () => {

  const [areas, setAreas] = useState([])
  const url='http://localhost:3000/area/getlist/'

  const loadAreas = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setAreas(data);
    // console.log(data);
  }
  const deleteArea = async (id) => {
    // console.log(id);
    Swal.fire({
      title: '¿Está seguro de eliminar esta área?',
      text: "¡No podrá revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28A745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await fetch("http://localhost:3000/area/delete/" + id, {
          method: "DELETE",
        });
        setAreas(areas.filter(area => area.id !== id));
        alertMessage('¡Eliminación exitosa!', 'El área has sido eliminada', 'success', 'OK', '#28A745');
      }
    })
  }

  return [areas,loadAreas,deleteArea]
}


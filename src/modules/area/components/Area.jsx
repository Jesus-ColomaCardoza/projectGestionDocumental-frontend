import { useEffect, useState } from "react";
import { useArea } from "../hooks/useArea";
import { filterByField, getDateTime } from "../../utils/library/application";
import Pagination from "../../utils/components/Pagination";
import NavWithSearch from "../../utils/components/NavWithSearch";
import Modal from "../../utils/components/Modal";
import { useModal } from "../../utils/hooks/useModal";
import FormAreaAdd from "./FormAreaAdd";
import FormAreaUpdate from "./FormAreaUpdate";
import { Link } from "react-router-dom";
import { usePagination } from "../../utils/hooks/usePagination";
import HeaderWithBreadcrumb from "../../utils/components/HeaderWithBreadcrumb";

const Area = () => {

  //varibles: areas
  const {
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
  } = useArea();
  const [areaId, setAreaId] = useState(null);
  const [filterField, setFilterField] = useState("");

  //varibles: modals
  const [modalAddArea, openModalAddArea, closeModalAddArea] = useModal(false);
  const [modalUpdateArea, openModalUpdateArea, closeModalUpdateArea] =
    useModal(false);

  //varibles: pagination
  const {
    indexInitial,
    indexFinal,
    nData,
    nPages,
    setDataQuantity,
    currentPage,
    setCurrentPage,
  } = usePagination(areas);

  const handleSearch = (e) => {
    const name = e.target.value;
    setFilterField(name);
    if (name == "") {
      loadAreas();
    }
  };

  const filterAreas = async () => {
    let data = areas;
    if (filterField !== "") {
      let filter = filterByField(data, "area_name", filterField);
      //we set the filter
      setAreas(filter);
      //we reset from first page, to show the results
      setCurrentPage(1);
    }
  };

  useEffect(() => {
    loadAreas();
  }, []);

  useEffect(() => {
    filterAreas();
  }, [filterField]);

  return (
    <div>
      {/* Modals*/}

      {/* addModal*/}
      <Modal
        title="Nueva Área"
        isOpen={modalAddArea}
        closeModal={closeModalAddArea}
      >
        <FormAreaAdd
          textButton1="Registrar"
          textButton2="Cancelar"
          typeButton1="success"
          typeButton2="secondary"
          handleButton2={closeModalAddArea}
          addArea={addArea}
          dataAdd={dataAdd}
          setDataAdd={setDataAdd}
        />
      </Modal>

      {/* updateModal*/}
      <Modal
        title="Modificación de Área"
        isOpen={modalUpdateArea}
        closeModal={closeModalUpdateArea}
      >
        <FormAreaUpdate
          id={areaId}
          textButton1="Modificar"
          textButton2="Cancelar"
          typeButton1="danger"
          typeButton2="secondary"
          handleButton2={closeModalUpdateArea}
          getArea={getArea}
          updateArea={updateArea}
          dataUpdate={dataUpdate}
          setDataUpdate={setDataUpdate}
        />
      </Modal>

      {/*Header with Dashboard/breadcrumb */}
      <HeaderWithBreadcrumb title="Mantenimiento de áreas" breadcrumb="Áreas" />

      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header py-2 d-flex justify-content-between align-items-center">
                  <h3 className="card-title">Lista de áreas</h3>
                  <button
                    type="button"
                    className="btn btn-success px-2 py-1 ms-auto "
                    onClick={openModalAddArea}
                  >
                    <i className="bi bi-plus text--white"></i>
                    Nuevo
                  </button>
                </div>
                {/* /.card-header */}
                <div className="card-body">
                  <NavWithSearch
                    nameSearch={filterField}
                    handleSearch={handleSearch}
                    setDataQuantity={setDataQuantity}
                    setCurrentPage={setCurrentPage}
                  />
                  <table className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Área</th>
                        <th>Fecha de Registro</th>
                        <th>Estatus</th>
                        <th>Opciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {nData.map((area, index) => {
                        return (
                          <tr key={area.id}>
                            <td>{index + 1}</td>
                            <td>{area.area_name}</td>
                            <td>{getDateTime(area.createdAt)}</td>
                            <td>
                              <span
                                className={`highlighter highlighter--${
                                  area.state == "activo" ? "green" : "red"
                                }`}
                              >
                                {area.state}
                              </span>
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-info me-1"
                                onClick={() => {
                                  openModalUpdateArea(), setAreaId(area.id);
                                }}
                              >
                                <i className="bi bi-pencil-fill text--white"></i>
                              </button>
                              <button
                                type="button"
                                className="btn btn-warning me-1"
                                onClick={() => {
                                  deleteArea(area.id);
                                }}
                              >
                                <i className="bi bi-trash-fill text--white"></i>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    indexInitial={indexInitial}
                    indexFinal={indexFinal}
                    nPages={nPages}
                  />
                </div>
                {/* /.card-body */}
              </div>
              {/* /.card */}
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </section>
      {/* /.content */}
    </div>
  );
};

export default Area;

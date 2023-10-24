import { useEffect, useState } from 'react';
import '../stylesheets/Usuario.css'
import { useModal } from '../hookscustom/useModal';
import Modal from '../components/Modal';
import NavWithSearch from '../components/NavWithSearch';
import HeaderWithButton from '../components/HeaderWithButton';
import FormUserAdd from '../components/FormUserAdd';
import FormUserUpdate from '../components/FormUserUpdate';
import { alertMessage } from '../components/AlertMessage';
import FormAreaAdd from '../components/FormAreaAdd';
import FormAreaUpdate from '../components/FormAreaUpdate';

const Area = () => {
  const [areas, setAreas] = useState([]);
  const [areaName, setAreaName] = useState('');

  const [ areaId, setAreaId] = useState(null);

  const [modalAddArea, openModalAddArea, closeModalAddArea] = useModal(false);
  const [modalUpdateArea, openModalUpdateArea, closeModalUpdateArea] = useModal(false);

  const loadAreas = async () => {
    const response = await fetch('http://localhost:3000/area/getlist/');
    const data = await response.json();
    setAreas(data);
    // console.log(data);
  }
  const loadAreasByName = async () => {
    if (areaName !== '') {
      const response = await fetch("http://localhost:3000/area/getbyname/" + areaName);
      const data = await response.json();
      setAreas(data);
      //console.log(data);
    }
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
  const handleChangeState = async (id, value) => {
    await fetch(`http://localhost:3000/usuario/update/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ state: value }),
      headers: { 'Content-type': 'application/json' }
    });
  }
  const handleChangeStateDom = (e) => {

    let button = e.target.classList.contains('bi') ? e.target.parentElement : e.target;
    let td = button.parentElement;

    if (button.classList.contains('btn-success')) {
      td.parentElement.children[5].firstChild.classList.replace('highlighter--red', 'highlighter--green');
      td.parentElement.children[5].firstChild.textContent = 'activo';
      td.children[2].disabled = true;
      td.children[3].disabled = false;

    } else if (button.classList.contains('btn-danger')) {
      td.parentElement.children[5].firstChild.classList.replace('highlighter--green', 'highlighter--red');
      td.parentElement.children[5].firstChild.textContent = 'bloqueado';
      td.children[2].disabled = false;
      td.children[3].disabled = true;
    }
  }
  const handleSearchAreaName = (e) => {
    const name = e.target.value;
    setAreaName(name)
    if (name == '') {
      loadAreas()
    }
  }

  useEffect(() => { loadAreas() }, []);
  useEffect(() => { loadAreasByName() }, [areaName]);

  const getDateTime = (datetimestamp) => {
    let timestamp = new Date(datetimestamp);
    // Extraer la fecha
    const año = timestamp.getFullYear();
    const mes = timestamp.getMonth() + 1; 
    const día = timestamp.getDate();

    // Extraer la hora
    const horas = timestamp.getHours();
    const minutos = timestamp.getMinutes();
    const segundos = timestamp.getSeconds();

    // Formatear la fecha y la hora
    const fecha = `${día.toString().padStart(2, '0')}-${mes.toString().padStart(2, '0')}-${año}`;
    const hora = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;

    console.log(fecha+' '+hora);
    return fecha+' '+hora 
  }
  return (

    <div className='container'>

      {/* Modals  */}
      {/* add user Modal , the handle table get can improve with query to the backend*/}
      <Modal
        title='Nueva Área'
        isOpen={modalAddArea}
        closeModal={closeModalAddArea}
      >
       <FormAreaAdd 
        textButton1='Registrar'
        textButton2='Cancelar'
        typeButton1='success'
        typeButton2='secondary'
        handleButton2={closeModalAddArea}
        handleTable={loadAreas}
       />
      </Modal>

      {/* update user Modal */}
      <Modal
        title='Modificación de Área'
        isOpen={modalUpdateArea}
        closeModal={closeModalUpdateArea}
      >
       <FormAreaUpdate
        id={areaId}
        textButton1='Modificar'
        textButton2='Cancelar'
        typeButton1='danger'
        typeButton2='secondary'
        handleButton2={closeModalUpdateArea}
        handleTable={loadAreas}
       /> 
      </Modal>
      {/* ----------- */}

      <header>
        <h2 className='container-list__h2'>Mantenimiento de áreas</h2>
      </header>

      <div className='container-list'>

        <HeaderWithButton
          textNav='Listado de áreas'
          textButton='Nuevo Registro'
          typeButton='success'
          openModal={openModalAddArea}
        />

        <NavWithSearch
          nameSearch={areaName}
          handleSearch={handleSearchAreaName}
        />

        <div className='custom-scroll'>
          <table className="table table-hover">
            <thead className='custom-sticky table-light'>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Área</th>
                <th scope="col">Fecha de Registro</th>
                <th scope="col">Estatus</th>
                <th scope="col">Optiones</th>
              </tr>
            </thead>
            <tbody>
              {
                areas.map((area, index) => {
                  return (
                    <tr key={area.id}>
                      <th scope="row">{index + 1}</th>
                      <td>{area.area_name}</td>
                      <td>{getDateTime(area.createdAt)}</td>
                      <td>
                        <span className={`highlighter highlighter--${area.state == 'activo' ? 'green' : 'red'}`}>
                          {area.state}
                        </span>
                      </td>
                      <td onClick={handleChangeStateDom}>
                        <button
                          type="button"
                          className="btn btn-info me-1"
                          onClick={() => { openModalUpdateArea(), setAreaId(area.id) }}>
                          <i className="bi bi-pencil-fill text--white"></i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-warning me-1"
                          onClick={() => { deleteArea(area.id) }}>
                          <i className="bi bi-trash-fill text--white"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>

      </div>
    </div>

  );
}


export default Area
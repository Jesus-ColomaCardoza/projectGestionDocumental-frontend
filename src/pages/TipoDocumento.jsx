import { useEffect, useState } from 'react';
import '../stylesheets/Usuario.css'
import { useModal } from '../hookscustom/useModal';
import Modal from '../components/Modal';
import NavWithSearch from '../components/NavWithSearch';
import HeaderWithButton from '../components/HeaderWithButton';
import FormTipoDocAdd from '../components/FormTipoDocAdd';
import FormTipoDocUpdate from '../components/FormTipoDocUpdate';
import { alertMessage } from '../components/AlertMessage';

const TipoDocumento = () => {
  const [tiposDocumento, setTiposDocumento] = useState([]);
  const [tiposDocumentoName, setTiposDocumentoName] = useState('');

  const [tipoDocId, setTipoDocId] = useState(null);
  const [modalAddTipoDoc, openModalAddTipoDoc, closeModalAddTipoDoc] = useModal(false);
  const [modalUpdateTipoDoc, openModalUpdateTipoDoc, closeModalUpdateTipoDoc] = useModal(false);

  const loadTiposDocumento = async () => {
    const response = await fetch('http://localhost:3000/tipodocumento/getlist/');
    const data = await response.json();
    setTiposDocumento(data);
    // console.log(data);
  }
  const loadTiposDocumentoByName = async () => {
    if (tiposDocumentoName !== '') {
      const response = await fetch("http://localhost:3000/tipodocumento/getbyname/" + tiposDocumentoName);
      const data = await response.json();
      setTiposDocumento(data);
      //console.log(data);
    }
  }
  const deleteTipoDocumento = async (id) => {
    // console.log(id);
    Swal.fire({
      title: '¿Está seguro de eliminar este tipo de documento?',
      text: "¡No podrá revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28A745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await fetch("http://localhost:3000/tipodocumento/delete/" + id, {
          method: "DELETE",
        });
        setTiposDocumento(tiposDocumento.filter(tipoDocumento => tipoDocumento.id !== id));
        alertMessage('¡Eliminación exitosa!', 'Este tipo de documento ha sido eliminado', 'success', 'OK', '#28A745');
      }
    })
  }
  const handleSearchTiposDocumentoName = (e) => {
    const name = e.target.value;
    setTiposDocumentoName(name)
    console.log(name);
    if (name == '') {
      loadTiposDocumento()
    }
  }

  useEffect(() => { loadTiposDocumento() }, []);
  useEffect(() => { loadTiposDocumentoByName() }, [tiposDocumentoName]);

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
        title='Nuevo tipo de documento'
        isOpen={modalAddTipoDoc}
        closeModal={closeModalAddTipoDoc}
      >
       <FormTipoDocAdd 
        textButton1='Registrar'
        textButton2='Cancelar'
        typeButton1='success'
        typeButton2='secondary'
        handleButton2={closeModalAddTipoDoc}
        handleTable={loadTiposDocumento}
        allTiposDoc={tiposDocumento}
       />
      </Modal>

      {/* update user Modal */}
      <Modal
        title='Modificación de Área'
        isOpen={modalUpdateTipoDoc}
        closeModal={closeModalUpdateTipoDoc}
      >
       <FormTipoDocUpdate
        id={tipoDocId}
        textButton1='Modificar'
        textButton2='Cancelar'
        typeButton1='danger'
        typeButton2='secondary'
        handleButton2={closeModalUpdateTipoDoc}
        handleTable={loadTiposDocumento}
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
          openModal={openModalAddTipoDoc}
        />

        <NavWithSearch
          nameSearch={tiposDocumentoName}
          handleSearch={handleSearchTiposDocumentoName}
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
                tiposDocumento.map((tdoc, index) => {
                  return (
                    <tr key={tdoc.id}>
                      <th scope="row">{index + 1}</th>
                      <td>{tdoc.description}</td>
                      <td>{getDateTime(tdoc.createdAt)}</td>
                      <td>
                        <span className={`highlighter highlighter--${tdoc.state == 'activo' ? 'green' : 'red'}`}>
                          {tdoc.state}
                        </span>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-info me-1"
                          onClick={() => { openModalUpdateTipoDoc(), setTipoDocId(tdoc.id) }}>
                          <i className="bi bi-pencil-fill text--white"></i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-warning me-1"
                          onClick={() => { deleteTipoDocumento(tdoc.id) }}>
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


export default TipoDocumento
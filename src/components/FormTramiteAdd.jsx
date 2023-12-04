import React, { useState, useEffect } from 'react';
import { alertMessage } from '../libraries/alertMessage';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import { useModal } from '../hookscustom/useModal';
import FormSenderAdd from './FormSenderAdd';
import FormProcedureAdd from './FormProcedureAdd';
import FormDocumentAdd from './FormDocumentAdd';

//images
import defaultPhoto from '../assets/media/img/defaultPhoto.png'
import ListDocuments from './ListDocuments';


const FormTramiteAdd = ({
  textButton1,
  textButton2,
  typeButton1,
  typeButton2,
  handleButton2,
  handleTable,
}) => {


  const [documents, setDocuments] = useState([]);
  const [typeSource, setTypeSource] = useState('');

  const [photo, setPhoto] = useState(null);
  const [temporalPhoto, setTemporalPhoto] = useState(defaultPhoto);
  const [tiposDocumento, setTiposDocumento] = useState([]);


  const [modalAddSender, openModalAddSender, closeModalAddSender] = useModal(false);
  const [modalAddProcedure, openModalAddProcedure, closeModalAddProcedure] = useModal(false);
  const [modalAddDocument, openModalAddDocument, closeModalAddDocument] = useModal(false);
  const navigate = useNavigate();


  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
    // formData.append(e.target.name,e.target.value)

  };

  const handleSelectedFile = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setTemporalPhoto(e.target.result);
      }
      reader.readAsDataURL(e.target.files[0]);
      setPhoto(e.target.files[0]);
      // console.log(e.target.files[0]);
    } else {
      setTemporalPhoto(defaultPhoto);
      setPhoto(null);
    }
  }

  const addEmployee = async (e) => {
    //falta implementar : cuando un usuario no se registro correctamente no se valida, se debe mostrar error 
    e.preventDefault();

    try {
      if (photo == null && temporalPhoto == defaultPhoto) {
        throw new Error('Seleccione foto de perfil');
      }

      const formData = new FormData();
      const arrayEntries = Object.entries(employee);

      formData.append('profile_photo', photo);
      arrayEntries.forEach(element => {
        formData.append(element[0], element[1]);
      });

      const response = await fetch('http://localhost:3000/empleado/create/', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json();
      console.log(data);
      //we reset the form      
      e.target.reset();
      //we reset the photo and temporalPhoto
      setPhoto(null)
      setTemporalPhoto(defaultPhoto);
      //we show the confirmed modal  
      alertMessage('Registro exitoso!', 'El empleado has sido registrado', 'success', 'OK', '#28A745');
      //we close the modal window
      handleButton2();
      //cambiar el estado de la tabla user
      handleTable();
      //reset el object employeeDates
      setEmployee(initialEmployeeDates);
    } catch (error) {
      alertMessage('Error!', error, 'error', 'OK', '#d33');
      console.log(error);
    }

  }

  const loadTiposDocumento = async () => {
    const response = await fetch('http://localhost:3000/tipodocumento/getlist/');
    const data = await response.json();
    setTiposDocumento(data);
    // console.log(data);
  }

  useEffect(() => { loadTiposDocumento() }, []);

  return (
    // <>
    // <p>add tramite</p>

    // <button onClick={()=>{navigate('../lista')}}>
    //   previos
    // </button>
    // </>
    <>
      <main className="container">

        {/* sender modal */}
        <Modal
          title='Registro de Remitente'
          isOpen={modalAddSender}
          closeModal={closeModalAddSender}
          size='medium'
        >
          <FormSenderAdd
            textButton1='Registrar'
            textButton2='Cancelar'
            typeButton1='success'
            typeButton2='secondary'
            handleButton2={closeModalAddSender}
            handleTable={''}
          />
        </Modal>

        {/* procedure modal */}
        <Modal
          title='Registro de Trámite'
          isOpen={modalAddProcedure}
          closeModal={closeModalAddProcedure}
          size='small'
        >
          <FormProcedureAdd
            textButton1='Registrar'
            textButton2='Cancelar'
            typeButton1='success'
            typeButton2='secondary'
            handleButton2={closeModalAddProcedure}
            handleTable={''}
          />

        </Modal>

        {/* document modal */}
        <Modal
          title='Registro de Trámite'
          isOpen={modalAddDocument}
          closeModal={closeModalAddDocument}
          size='small'
        >
          <FormDocumentAdd
            textButton1='Registrar'
            textButton2='Cancelar'
            typeButton1='success'
            typeButton2='secondary'
            handleButton2={closeModalAddDocument}
            documents={documents}
            typeSource={typeSource}
          />

        </Modal>

        <div className="row p-3">

          <section className='col-12 col-lg-6 bg-white p-0 border border-1'>

            <article className="row px-2">
              <h3 className='text-white bg-secondary p-1 fs-5'>Datos de Trámite</h3>
              <div className="col-8 d-flex align-items-center">
                <strong className='text-primary'>Código de Trámite | </strong>
                <strong className=''>0000000089</strong>
              </div>
              <div className="col-4 text-end">
                <button className="btn btn-info" onClick={openModalAddProcedure}>
                  <i className="bi bi-pencil"></i>
                </button>
              </div>
              <div className="col-12">
                <strong className='text-primary'>Asunto</strong>
                <p className=''>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim providentf</p>
              </div>
              <div className="col-4">
                <strong className='text-primary'>Fecha de Registro</strong>
                <p>Persona Jurídica</p>
              </div>
              <div className="col-4">
                <strong className='text-primary'>Estado</strong>
                <p>Persona Jurídica</p>
              </div>
              <div className="col-4">
                <strong className='text-primary'>Área actual</strong>
                <p>Persona Jurídica</p>
              </div>
              <div className="col-12">
                <strong className='text-primary'>Observación</strong>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam ratione</p>
              </div>



            </article>

            <article className="row px-2">
              <h3 className='text-white bg-secondary p-1 fs-5'>Documentos</h3>
              <ListDocuments
                title='Documentos Adjuntados - Oficina'
                setTypeSource={setTypeSource}
                openModalAddDocument={openModalAddDocument}
                documents={documents}
                filter='oficina'
              />
              <ListDocuments
                title='Documentos Adjuntados - Remitente'
                setTypeSource={setTypeSource}
                openModalAddDocument={openModalAddDocument}
                documents={documents}
                filter='remitente'
              />
            </article>
          </section>

          <section className='col-12 col-lg-6 bg-white p-0 border border-1'>

            <article className="row px-2">
              <h3 className='text-white bg-secondary p-1 fs-5'>Datos de remitente</h3>
              <div className="col-8 input-group mb-3">
                <input required type="text" className="form-control" name='nro_document' id='nro_document' placeholder='Número de documento' onChange={handleChange} />
                <button className="input-group-text">
                  <i className="bi bi-search"></i>
                </button>
              </div>
              <div className="col-4 text-end mb-3">
                <button className="btn btn-info" onClick={openModalAddSender}>
                  <i className="bi bi-person-plus-fill"></i>
                </button>
              </div>
              <div className="col-4">
                <strong className='text-primary'>Tipo de persona</strong>
                <p className=''>Persona Jurídica</p>
              </div>
              <div className="col-4">
                <strong className='text-primary'>RUC</strong>
                <p>Persona Jurídica</p>
              </div>
              <div className="col-4">
                <strong className='text-primary'>Razón Social</strong>
                <p>Persona Jurídica</p>
              </div>
              <div className="col-12">
                <strong className='text-primary'>Nro documento | Nombres y apellidos</strong>
                <p>65786514 | Helllary Jesus Coloma Cardoza</p>
              </div>
              <div className="col-4">
                <strong className='text-primary'>Teléfono</strong>
                <p>+5198765432</p>
              </div>
              <div className="col-8">
                <strong className='text-primary'>Correo</strong>
                <p className='text-break'>colomacardoza@gmail.com</p>
              </div>
              <div className="col-12">
                <strong className='text-primary'>Dirección</strong>
                <p className='text-break'>Sullana. Bellavista. Madre de Dios 240</p>
              </div>
            </article>

          </section>

        </div>
      </main>

    </>
  )
}

export default FormTramiteAdd
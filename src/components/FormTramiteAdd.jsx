import React, { useState } from 'react';
import { alertMessage } from '../libraries/alertMessage';
import defaultPhoto from '../assets/media/img/defaultPhoto.png'
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import { useModal } from '../hookscustom/useModal';

const FormTramiteAdd = ({
  textButton1,
  textButton2,
  typeButton1,
  typeButton2,
  handleButton2,
  handleTable,
}) => {

  const initialEmployeeDates = {
    nro_document: '',
    employee_name: '',
    paternal_surname: '',
    maternal_surname: '',
    date_birth: '',
    phone: '',
    email: '',
    address: '',
  }

  const [employee, setEmployee] = useState(initialEmployeeDates);
  const [photo, setPhoto] = useState(null);
  const [temporalPhoto, setTemporalPhoto] = useState(defaultPhoto);

  const [modalAddSender, openModalAddSender, closeModalAddSender] = useModal(false);


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
  const navigate = useNavigate();

  return (
    // <>
    // <p>add tramite</p>

    // <button onClick={()=>{navigate('../lista')}}>
    //   previos
    // </button>
    // </>
    <>
      <div className="container">

        <Modal
          title='Registro de Remitente'
          isOpen={modalAddSender}
          closeModal={closeModalAddSender}
          size='medium'
        >
          <form className="row g-2 px-3" encType="multipart/form-data" onSubmit={addEmployee}>
            <div className="col-4">
              <label htmlFor="nro_document" className="">Nro Documento</label>
              <input required type="text" className="form-control" name='nro_document' id='nro_document' onChange={handleChange} />
            </div>
            <div className="col-8">
              <label htmlFor="inputEmail4" className="form-label">Nombres</label>
              <input required type="text" className="form-control" name='employee_name' onChange={handleChange} />
            </div>
            <div className="col-6">
              <label htmlFor="inputEmail4" className="form-label">Apellido Paterno</label>
              <input required type="text" className="form-control" name='paternal_surname' onChange={handleChange} />
            </div>
            <div className="col-6">
              <label htmlFor="inputEmail4" className="form-label">Apellido Materno</label>
              <input required type="text" className="form-control" name='maternal_surname' onChange={handleChange} />
            </div>
            <div className="col-6">
              <label htmlFor="inputEmail4" className="form-label">Fecha de Nacimiento</label>
              <input required type="date" className="form-control" name='date_birth' onChange={handleChange} />
            </div>
            <div className="col-6">
              <label htmlFor="inputEmail4" className="form-label">Teléfono</label>
              <input required type="text" className="form-control" name='phone' onChange={handleChange} />
            </div>
            <div className="col-6">
              <label htmlFor="inputEmail4" className="form-label">Correo</label>
              <input required type="email" className="form-control" name='email' onChange={handleChange} />
            </div>
            <div className="col-6">
              <label htmlFor="inputEmail4" className="form-label">Dirección</label>
              <input required type="text" className="form-control" name='address' onChange={handleChange} />
            </div>
            <div className="col-12">
              <label htmlFor="inputEmail4" className="form-label d-block">En Representación</label>
              <div className="row">
                <div className="col-4 text-center">
                  <input type="radio" name="in_representation" id="toOwnName" value={'A nombre propio'} className="form-check-input" />
                  <label htmlFor="toOwnName" className="form-check-label">A nombre propio</label>
                </div>
                <div className="col-4 text-center">
                  <input type="radio" name="in_representation" id="toOtherNaturalPerson" value={'A otra persona natural'} className="form-check-input" />
                  <label htmlFor="toOtherNaturalPerson" className="form-check-label">A otra persona natural</label>
                </div>
                <div className="col-4 text-center">
                  <input type="radio" name="in_representation" id="JuridicPerson" value={'Persona jurídica'} className="form-check-input" />
                  <label htmlFor="JuridicPerson" className="form-check-label">Persona jurídica</label>
                </div>
              </div>
            </div>
            <div className="col-6">
              <label htmlFor="inputEmail4" className="form-label">RUC</label>
              <input required type="text" className="form-control" name='ruc' onChange={handleChange} />
            </div>
            <div className="col-6">
              <label htmlFor="inputEmail4" className="form-label">Razón Social</label>
              <input required type="email" className="form-control" name='razon_social' onChange={handleChange} />
            </div>
            <div className="col-12 text-end pt-1 ">
              <button type="submit" className='btn btn-success ms-1'>Registrar</button>
              <button type="button" className='btn btn-secondary ms-1' onClick={closeModalAddSender}>Cancelar</button>
            </div>
          </form>
        </Modal>

        <div className="row p-3">

          <div className='col-12 col-lg-6 bg-white p-0 border border-1'>

            <div className="row px-2">
              <h3 className='text-white bg-secondary p-1 fs-5'>Datos de Trámite</h3>
              <div className="col-8 d-flex align-items-center">
                <strong className='text-primary'>Código de Trámite | </strong>
                <strong className=''>0000000089</strong>
              </div>
              <div className="col-4 text-end">
                <button className="btn btn-info" onClick={openModalAddSender}>
                  <i className="bi bi-plus-lg"></i>
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



            </div>
            <div className="row px-2">
              <h3 className='text-white bg-secondary p-1 fs-5'>Documentos</h3>
              <div className="col-8 d-flex align-items-center">
                <strong className='text-primary'>Código de Trámite | </strong>
                <strong className=''>0000000089</strong>
              </div>
              <div className="col-4 text-end">
                <button className="btn btn-info" onClick={openModalAddSender}>
                  <i className="bi bi-plus-lg"></i>
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
            </div>

          </div>

          <div className='col-12 col-lg-6 bg-white p-0 border border-1'>

            <div className="row px-2">
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
            </div>

          </div>

        </div>
      </div>

    </>
  )
}

export default FormTramiteAdd
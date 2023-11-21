import React, { useState } from 'react';
import { alertMessage } from '../libraries/alertMessage';
import defaultPhoto from '../assets/media/img/defaultPhoto.png'
import { useNavigate } from 'react-router-dom';

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
        <div className="row d-flex justify-content-lg-evenly py-4">
          <div className='col-12 col-lg-5 bg-white p-0'>
            <h3 className='text-white bg-danger p-1 text-center'>Datos de remitente</h3>
            <form className="row g-2 px-3" encType="multipart/form-data" onSubmit={addEmployee}>
              <div className="col-6">
                <label htmlFor="nro_document" className="">Nro Documento</label>
                <input required type="text" className="form-control" name='nro_document' id='nro_document' onChange={handleChange} />
              </div>
              <div className="col-6">
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
              <div className="col-12">
                <label htmlFor="inputEmail4" className="form-label">Dirección</label>
                <input required type="text" className="form-control" name='address' onChange={handleChange} />
              </div>
              <div className="col-12">
                <label htmlFor="inputEmail4" className="form-label d-block">En Representación</label>
                <div className="row">
                  <div className="col-4">
                    <input type="radio" className='custom-control-input custom-control-input-danger' name="in_representation" id="toOwnName" value={'A nombre propio'} />
                    <label htmlFor="toOwnName" className="d-inline ms-2">A nombre propio</label>
                  </div>
                  <div className="col-4">
                    <input type="radio" name="in_representation" id="toOtherNaturalPerson" value={'A otra persona natural'} />
                    <label htmlFor="toOtherNaturalPerson" className="d-inline ms-2">A otra persona natural</label>
                  </div>
                  <div className="col-4">
                    <input type="radio" name="in_representation" id="JuridicPerson" value={'Persona jurídica'} />
                    <label htmlFor="JuridicPerson" className="d-inline ms-2">Persona jurídica</label>
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
              <div className="col-12 d-flex justify-content-end">
                <button type="submit" className={`btn btn-${typeButton1} ms-1`}>{textButton1}</button>
                <button type="button" className={`btn btn-${typeButton2} ms-1`} onClick={handleButton2}>{textButton2}</button>
              </div>
            </form>
          </div>
          <div className='col-12 col-lg-5 bg-white p-0'>
            1
          </div>
        </div>

      </div>

    </>
  )
}

export default FormTramiteAdd
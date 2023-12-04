import React, { useState } from 'react';
import { alertMessage } from '../libraries/alertMessage';
import defaultPhoto from '../assets/media/img/defaultPhoto.png'



const FormProcedureAdd = ({
  textButton1,
  textButton2,
  typeButton1,
  typeButton2,
  handleButton2,
  handleTable
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


  return (
    <>
      <form className="row g-2 px-3" encType="multipart/form-data" onSubmit={addEmployee}>
        <div className="col-6">
          <label htmlFor="cod_procedure" className="">Código de Trámite</label>
          <input required type="text" className="form-control" name='id' id='cod_procedure' onChange={handleChange} />
        </div>
        <div className="col-12">
          <label htmlFor="inputEmail4" className="form-label">Asunto</label>
          <input required type="text" className="form-control" name='subject' onChange={handleChange} />
        </div>
        <div className="col-12">
          <label htmlFor="inputEmail4" className="form-label">Observación</label>
          <textarea className="form-control" name='observation' onChange={handleChange} rows="3"></textarea>
        </div>
        <div className="col-12 text-end pt-1 ">
          <button type="submit" className={`btn btn-${typeButton1} ms-1`}>{textButton1}</button>
          <button type="button" className={`btn btn-${typeButton2} ms-1`} onClick={handleButton2}>{textButton2}</button>
        </div>
      </form>
    </>
  )
}

export default FormProcedureAdd
import React, { useState, useEffect } from 'react';
import { alertMessage } from '../libraries/alertMessage';
import defaultPhoto from '../assets/media/img/defaultPhoto.png'
import '../stylesheets/FormEmpleadoAdd.css'

const FormEmpleadoUpdate = ({
  id,
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
    state: ''
  }

  const [employee, setEmployee] = useState(initialEmployeeDates);
  const [photo, setPhoto] = useState(null);
  const [temporalPhoto, setTemporalPhoto] = useState(defaultPhoto);


  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
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

  const updateEmployee = async (e) => {
    //falta implementar : cuando un usuario no se registro correctamente no se valida, se debe mostrar error 
    e.preventDefault();

    try {
      if (photo==null && temporalPhoto==defaultPhoto) {
         throw new Error('Seleccione foto de perfil');
         
      }else if (photo == null && temporalPhoto!=defaultPhoto) {
        throw new Error('change without photo');
        //we update without change the url image
        // const response = await fetch('http://localhost:3000/empleado/update/'+id, {
        //   method: 'POST',
        //   body: formData,
        // })
        // const data = await response.json();
        // console.log(data);
      } else {
        throw new Error('change with photo');
      
        // //we update including the change the url image
        // const formData = new FormData();
        // const arrayEntries = Object.entries(employee);

        // formData.append('profile_photo', photo);
        // arrayEntries.forEach(element => {
        //   formData.append(element[0], element[1]);
        // });

        // const response = await fetch('http://localhost:3000/empleado/update/'+id, {
        //   method: 'POST',
        //   body: formData,
        // })
        // const data = await response.json();
        // console.log(data);
      }


      // //we reset the add user form      
      // e.target.reset();
      // //we reset the setPhoto
      // setPhoto(null)
      // //we show the confirmed modal  
      // alertMessage('Registro exitoso!', 'El empleado has sido registrado', 'success', 'OK', '#28A745');
      // //we close the modal window
      // handleButton2();
      // //cambiar el estado de la tabla user
      // handleTable();
      // //reset el object employeeDates
      // setEmployee(initialEmployeeDates);
      // //reset the photo in form
      // setPhoto(null)
      // setTemporalPhoto(defaultPhoto);
    } catch (error) {
      alertMessage('Error!', error, 'error', 'OK', '#d33');
      console.log(error);
    }
  }

  const getDatesEmployee = async () => {
    // console.log(id);
    try {
      const response = await fetch(`http://localhost:3000/empleado/get/${id}`);
      const data = await response.json();
      setEmployee(data)
      setTemporalPhoto(data.profile_photo)
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => { id != null ? getDatesEmployee(id) : false }, [id]);

  return (
    <>
      <form className="row g-3" encType="multipart/form-data" onSubmit={updateEmployee}>
        <div className="col-md-5 d-flex flex-wrap justify-content-center align-items-center">
          <strong className=''>Foto de Perfil</strong>
          <div className="col-md-12 text-center ">
            <div className='default-photo__container'>
              <img src={temporalPhoto} alt="default Photo Employee" className='default-photo' id='profile_photo__img' />
            </div>
            <input hidden type="file" name='profile_photo' id='profile_photo__input2' onChange={handleSelectedFile} />
            <label htmlFor="profile_photo__input2" className="btn btn-dark mt-2">Selecionar foto</label>
          </div>
        </div>
        <div className="col-md-7">
          <div className="col-md-12 mb-2">
            <label htmlFor="nro_document" className="">Nro Documento</label>
            <input required type="text" className="form-control" name='nro_document' id='nro_document' onChange={handleChange} value={employee.nro_document} />
          </div>
          <div className="col-md-12 mb-2">
            <label htmlFor="inputEmail4" className="form-label">Nombres</label>
            <input required type="text" className="form-control" name='employee_name' onChange={handleChange} value={employee.employee_name} />
          </div>
          <div className="col-md-12 mb-2">
            <label htmlFor="inputEmail4" className="form-label">Apellido Paterno</label>
            <input required type="text" className="form-control" name='paternal_surname' onChange={handleChange} value={employee.paternal_surname} />
          </div>
          <div className="col-md-12 mb-2">
            <label htmlFor="inputEmail4" className="form-label">Apellido Materno</label>
            <input required type="text" className="form-control" name='maternal_surname' onChange={handleChange} value={employee.maternal_surname} />
          </div>
        </div>
        <div className="col-md-4">
          <label htmlFor="inputEmail4" className="form-label">Fecha de Nacimiento</label>
          <input required type="date" className="form-control" name='date_birth' onChange={handleChange} value={employee.date_birth} />
        </div>
        <div className="col-md-4">
          <label htmlFor="inputEmail4" className="form-label">Teléfono</label>
          <input required type="text" className="form-control" name='phone' onChange={handleChange} value={employee.phone} />
        </div>
        <div className="col-md-4">
          <label className="form-label">Estatus</label>
          <select className="form-select" name='state' onChange={handleChange} value={employee.state}>
            <option disabled key={-1}>Seleccionar estado</option>
            <option key={0} value={'activo'}>activo</option>
            <option key={1} value={'inactivo'}>inactivo</option>
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">Dirección</label>
          <input required type="text" className="form-control" name='address' onChange={handleChange} value={employee.address} />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">Correo</label>
          <input required type="email" className="form-control" name='email' onChange={handleChange} value={employee.email} />
        </div>
        <div className="col-12 d-flex justify-content-end">
          <button type="submit" className={`btn btn-${typeButton1} ms-1`}>{textButton1}</button>
          <button type="button" className={`btn btn-${typeButton2} ms-1`} onClick={handleButton2}>{textButton2}</button>
        </div>
      </form>
    </>
  )
}

export default FormEmpleadoUpdate
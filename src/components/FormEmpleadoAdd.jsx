import React, { useState } from 'react';
import { alertMessage } from '../libraries/alertMessage';

const FormEmpleadoAdd = ({
  textButton1,
  textButton2,
  typeButton1,
  typeButton2,
  handleButton2,
  handleTable,
}) => {

  const initialEmployeeDates = {
    profile_photo:'',
    nro_document:'',
    employee_name:'',
    paternal_surname:'', 
    maternal_surname:'',
    date_birth:'',
    phone:'',
    email:'',
    address:'',
    // state:''
  }
  const [employee, setEmployee] = useState(initialEmployeeDates);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const addEmployee = async (e) => {
    //falta implementar : cuando un usuario no se registro correctamente no se valida, se debe mostrar error 
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/empleado/create/', {
        method: 'POST',
        body: JSON.stringify(employee),
        headers: { 'Content-Type': "application/json" }
      })
      //we reset the add user form
      e.target.reset();
      //we show the confirmed modal  
      alertMessage('Registro exitoso!', 'El usuario has sido registrado', 'success', 'OK', '#28A745');
    } catch (error) {
      alertMessage('Error!', error, 'error', 'OK', '#d33');
      console.log(error);
    }
    //we close the modal window
    handleButton2();
    //cambiar el estado de la tabla user
    handleTable();
    //reset el object userDates
    setUser(initialEmployeeDates)
  }

  return (
    <>
      <form className="row g-3" onSubmit={addEmployee}>
        <div className="col-md-4">
          <label htmlFor="inputEmail4" className="">Nro Documento</label>
          <input required type="text" className="form-control" name='nro_document' onChange={handleChange} />
        </div>
        <div className="col-md-8">
          <label htmlFor="inputEmail4" className="form-label">Nombres</label>
          <input required type="text" className="form-control" name='employee_name' onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">Apellido Paterno</label>
          <input required type="text" className="form-control" name='paternal_surname' onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">Apellido Materno</label>
          <input required type="text" className="form-control" name='maternal_surname' onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">Fecha de Nacimiento</label>
          <input required type="date" className="form-control" name='date_birth' onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">Teléfono</label>
          <input required type="text" className="form-control" name='phone' onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">Dirección</label>
          <input required type="text" className="form-control" name='address' onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">Correo</label>
          <input required type="email" className="form-control" name='email' onChange={handleChange} />
        </div>
        {/* <div className="col-md-6">
          <label className="form-label">Estatus</label>
          <select className="form-select" name='state' onChange={handleChange} value={employee.state}>
            <option disabled key={-1}>Seleccionar estado</option>
            <option key={0} value={'activo'}>activo</option>
            <option key={1} value={'inactivo'}>inactivo</option>
          </select>
        </div> */}
        <div className="col-md-12">
          <label htmlFor="inputEmail4" className="form-label">Foto</label>
          <input required type="file" className="form-control" name='profile_photo' onChange={handleChange} />
        </div>
        <div className="col-12 d-flex justify-content-end">
          <button type="submit" className={`btn btn-${typeButton1} ms-1`}>{textButton1}</button>
          <button type="button" className={`btn btn-${typeButton2} ms-1`} onClick={handleButton2}>{textButton2}</button>
        </div>
      </form>
    </>
  )
}

export default FormEmpleadoAdd
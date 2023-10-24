import React, { useState } from 'react';
import { alertMessage } from './AlertMessage';

const FormUserAdd = ({
  textButton1,
  textButton2,
  typeButton1,
  typeButton2,
  handleButton2,
  handleTable,
  stateEmployees,
  stateAreas
}) => {

  const initialUserDates = {
    user_name: '',
    user_password: '',
    empleado_id: '',
    area_id: '',
    role: ''
  }
  const [user, setUser] = useState(initialUserDates);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const addUser = async (e) => {
    //falta implementar : cuando un usuario no se registro correctamente no se valida, se debe mostrar error 
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/usuario/create/', {
        method: 'POST',
        body: JSON.stringify(user),
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
    setUser(initialUserDates)
  }

  return (
    <>
      <form className="row g-3" onSubmit={addUser}>
        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">Usuario</label>
          <input type="text" className="form-control" name='user_name' onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputPassword4" className="form-label">Contraseña</label>
          <input type="password" className="form-control" name='user_password' onChange={handleChange} />
        </div>
        <div className="col-md-12">
          <label className="form-label">Empleado</label>
          <select className="form-select" name='empleado_id' onChange={handleChange} value={-1}>
            <option disabled key={-1} value={-1}>Seleccionar empleado</option>
            {
              stateEmployees.map((employee) => {
                return <option key={employee.id} value={employee.id} >{employee.employee_name + ' ' + employee.maternal_surname + ' ' + employee.maternal_surname}</option>
              })
            }          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Area</label>
          <select className="form-select" name='area_id' onChange={handleChange} value={-1}>
            <option disabled key={-1} value={-1}>Seleccionar área</option>
            {
              stateAreas.map((area) => {
                return <option key={area.id} value={area.id} >{area.area_name}</option>
              })
            }
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Rol</label>
          <select className="form-select" name='role' onChange={handleChange} value={-1}>
            <option disabled key={-1} value={-1}>Seleccionar rol</option>
            <option key={0} value={'admin'}>admin</option>
            <option key={1} value={'user'}>user</option>
            {/* <option  key={-1}>Seleccionar rol</option>
            {
              roles.map((role) => { 
                return <option key={role.id} >{role.role_name}</option>
              })
            } */}
          </select>
        </div>
        <div className="col-12 d-flex justify-content-end">
          <button type="submit" className={`btn btn-${typeButton1} ms-1`}>{textButton1}</button>
          <button type="button" className={`btn btn-${typeButton2} ms-1`} onClick={handleButton2}>{textButton2}</button>
        </div>
      </form>
    </>
  )
}

export default FormUserAdd
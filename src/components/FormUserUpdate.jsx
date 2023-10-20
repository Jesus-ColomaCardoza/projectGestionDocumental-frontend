import React, { useEffect, useState } from 'react'
import { alertMessage } from './AlertMessage';

const FormUserUpdate = ({
  id,
  title,
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

  const updateUser = async (e) => {
    e.preventDefault();
    // console.log(id);
    try {
      await fetch(`http://localhost:3000/usuario/update/${id}`, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: { 'Content-type': 'application/json' }
      });
      alertMessage('Modificación exitoso!', 'El usuario ha sido modificado', 'success', 'OK', '#28A745');
    } catch (error) {
      alertMessage('Error!', error, 'error', 'OK', '#d33');
      console.log(error);
    }
    //we close the modal window
    handleButton2();
    //cambiar el estado de la tabla user
    handleTable();
  }

  const getDatesUser = async () => {
    // console.log(id);
    try {
      const response = await fetch(`http://localhost:3000/usuario/get/${id}`);
      const data = await response.json();
      setUser(data)
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => { id != null ? getDatesUser(id) : false }, [id]);

  return (
    <>
      <h3 className='mb-4 text-center'>{title}</h3>
      <form className="row g-3" onSubmit={updateUser}>
        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">Usuario</label>
          <input type="text" className="form-control" name='user_name' value={user.user_name} onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputPassword4" className="form-label">Contraseña</label>
          <input type="password" className="form-control" name='user_password' value={user.user_password} onChange={handleChange} />
        </div>
        <div className="col-md-12">
          <label className="form-label">Empleado</label>
          <select className="form-select" name='empleado_id' onChange={handleChange} value={user.empleado_id}>
            <option key={-1}>Seleccionar empleado</option>
            {
              stateEmployees.map((employee) => {
                return <option key={employee.id} value={employee.id} >{employee.employee_name + ' ' + employee.maternal_surname + ' ' + employee.maternal_surname}</option>
              })
            }
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Area</label>
          <select className="form-select" name='area_id' onChange={handleChange} value={user.area_id}>
            <option key={-1}>Seleccionar área</option>
            {
              stateAreas.map((area) => {
                return <option key={area.id} value={area.id} >{area.area_name}</option>
              })
            }
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Rol</label>
          <select className="form-select" name='role' onChange={handleChange} value={user.role}>
            <option key={-1}>Seleccionar rol</option>
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

export default FormUserUpdate
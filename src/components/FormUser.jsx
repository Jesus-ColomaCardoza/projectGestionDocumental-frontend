import React, { useEffect, useState } from 'react'

const FormUser = ({
  title,
  textButton1,
  typeButton1,
  handleButton1,
  textButton2,
  typeButton2,
  handleButton2
}) => {

  const userDates={
    user_name:'',
    user_password:'',
    empleado_id:'',
    area_id:'',
    role:''

  }
  const [user, setUser] = useState(userDates);
  const [employees, setEmployees] = useState([]);
  const [areas, setAreas] = useState([]);
  const [roles, setRoles] = useState([]);

  const loadEmployees = async () => {
    const response = await fetch('http://localhost:3000/empleado/getlist/');
    const data = await response.json();
    setEmployees(data);
    console.log(data);
  }
  const loadAreas = async () => {
    const response = await fetch('http://localhost:3000/area/getlist/');
    const data = await response.json();
    setAreas(data);
    console.log(data);
  }

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const addUser = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3000/usuario/create/', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-Type': "application/json" }
    })
    e.target.reset();
  }

  const updateUser = async (e) => {
    e.preventDefault();
    // console.log();
  }

  useEffect(() => { loadAreas() }, []);
  useEffect(() => { loadEmployees() }, []);

  // const loadRoles = async () => {
  //   const response = await fetch('http://localhost:3000/roles/getlist/');
  //   const data = await response.json();
  //   setRoles(data);
  //   console.log(data);
  // }

  return (
    <>
      <h3 className='mb-4 text-center'>{title}</h3>
      <form className="row g-3" onSubmit={handleButton1 == 'addUser' ? addUser : updateUser}>
        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">Usuario</label>
          <input type="text" className="form-control" id="inputEmail4" name='user_name' onChange={handleChange}/>
        </div>
        <div className="col-md-6">
          <label htmlFor="inputPassword4" className="form-label">Contraseña</label>
          <input type="password" className="form-control" id="inputPassword4" name='user_password' onChange={handleChange} />
        </div>
        <div className="col-md-12">
          <label htmlFor="inputState" className="form-label">Empleado</label>
          <select id="inputState" className="form-select" name='empleado_id' onChange={handleChange}>
            <option key={-1}>Seleccionar empleado</option>
            {
              employees.map((employee) => {
                return <option key={employee.id} value={employee.id} >{employee.employee_name}</option>
              })
            }          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="inputState" className="form-label">Area</label>
          <select id="inputState" className="form-select" name='area_id' onChange={handleChange}>
            <option key={-1}>Seleccionar área</option>
            {
              areas.map((area) => {
                return <option key={area.id} value={area.id} >{area.area_name}</option>
              })
            }
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="inputState" className="form-label">Rol</label>
          <select id="inputState" className="form-select" name='role' onChange={handleChange}>
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
          <button type="text" className={`btn btn-${typeButton2} ms-1`} onClick={handleButton2}>{textButton2}</button>
        </div>
      </form>

    </>
  )
}

export default FormUser
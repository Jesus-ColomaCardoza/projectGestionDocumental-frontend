import { useEffect, useState } from 'react';
import '../stylesheets/Usuario.css'
import { Link } from 'react-router-dom';

function Usuario() {

  const [users, setUsers] = useState([]);

  useEffect(() => { loadUsers() }, []);

  const loadUsers = async () => {
    const response = await fetch('http://localhost:3000/usuario/getlist');
    const data = await response.json()
    setUsers(data);
    console.log(data);
  }





  return (

    <div className='container'>
      <header>
        <h2 className='container-list__h2'>Mantenimiento de usuario</h2>
      </header>
      <div className='container-list'>
        <h3 className='container-list__h3'>Listado de Usuario</h3>
        <div>

          <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">Navbar</a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="bi bi-list"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">Home</a>
                  </li>
                </ul>
                <form className="d-flex" role="search">
                  <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                  <button className="btn btn-success" type="submit">Search</button>
                </form>
              </div>
            </div>
          </nav>

          <div className='custom-scroll'>
            <table className="table table-hover">
              <thead className='custom-sticky table-light'>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Usuario</th>
                  <th scope="col">Área</th>
                  <th scope="col">Rol</th>
                  <th scope="col">Empleado</th>
                  <th scope="col">Estatus</th>
                  <th scope="col">Optiones</th>
                </tr>
              </thead>
              <tbody>
                {
                  users.map((user, index) => {
                    return (
                      <tr key={user.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{user.user_name}</td>
                        <td>{user.Area.area_name}</td>
                        <td>{user.role}</td>
                        <td>{user.Area.state}</td>
                        <td>{user.state}</td>
                        <td>
                          <button type="button" className="btn btn-info mx-1">
                            <Link>
                              <i className="bi bi-pencil-fill text--white"></i>
                            </Link>
                          </button>
                          <button type="button" className="btn btn-danger mx-1">
                            <Link>
                              <i className="bi bi-trash-fill text--white"></i>
                            </Link>    
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
    </div>
  );
}

export default Usuario;
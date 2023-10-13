import { useEffect, useState } from 'react';
import '../stylesheets/Usuario.css'
import { Link } from 'react-router-dom';

function Usuario() {

  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState('');

  useEffect(() => { loadUsers() }, []);
  useEffect(() => { loadUsersByName() }, [userName]);

  const loadUsers = async () => {
    const response = await fetch('http://localhost:3000/usuario/getlist');
    const data = await response.json()
    setUsers(data);
    //console.log(data);
  }

  const loadUsersByName = async () => {
    try {
      if (userName !== '') {
        const response = await fetch("http://localhost:3000/usuario/getbyname/" + userName);
        const data = await response.json();
        setUsers(data);
        //console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleBuscarUserName = (e) => {
    const name = e.target.value;
    setUserName(name)
    if (name == '') {
      loadUsers()
    }
  }

  const deleteUser = async (id) => {
    // console.log(id);
    Swal.fire({
      title: '¿Está seguro de eliminar este usuario?',
      text: "¡No podrá revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28A745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await fetch("http://localhost:3000/usuario/delete/" + id, {
          method: "DELETE",
        });
        setUsers(users.filter(user => user.id !== id));
        Swal.fire({
            title: '¡Eliminación exitosa!',
            text: 'El usuario has sido eliminado',
            icon: 'success',
            confirmButtonColor: '#28A745',
            confirmButtonText: 'Ok'
          }
        )
      }
    })
  }
  return (

    <div className='container'>
      <header>
        <h2 className='container-list__h2'>Mantenimiento de usuario</h2>
      </header>
      <div className='container-list'>

        <div className='container-list__header'>
          <h3 className='container-list__h3'>Listado de Usuario</h3>
          <button type="button" className="btn btn-success me-1">
            <Link>
              <i className="bi bi-plus text--white"></i>
            </Link>
            Nuevo Registro
          </button>
        </div>

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
                <div className="d-flex" role="search">
                  <label className="my-auto">Buscar:</label>
                  <input
                    className="form-control mx-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={handleBuscarUserName}
                    value={userName} />
                </div>
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
                        <td>{
                          user.Empleado.employee_name + ' ' +
                          user.Empleado.paternal_surname + ' ' +
                          user.Empleado.maternal_surname
                        }
                        </td>
                        <td>
                          <span className='highlighter highlighter--red'>
                            {user.state}
                          </span>
                        </td>
                        <td>
                          <button type="button" className="btn btn-info me-1">
                            <Link>
                              <i className="bi bi-pencil-fill text--white"></i>
                            </Link>
                          </button>
                          <button
                            type="button"
                            className="btn btn-warning me-1"
                            onClick={() => { deleteUser(user.id) }}>
                            <i className="bi bi-trash-fill text--white"></i>
                          </button>
                          <button type="button" className="btn btn-success me-1">
                            <Link>
                              <i className="bi bi-check-circle-fill text--white"></i>
                            </Link>
                          </button>
                          <button type="button" className="btn btn-danger me-1">
                            <Link>
                              <i className="bi bi-x-circle-fill text--white"></i>
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
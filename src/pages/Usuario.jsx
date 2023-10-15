import { useEffect, useState } from 'react';
import '../stylesheets/Usuario.css'
import { Link } from 'react-router-dom';
import SearchNav from '../components/SearchNav';
import Modal from '../components/Modal';
import { useModal } from '../hookscustom/useModal';

function Usuario() {

  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState('');
  const [modalAddUser, openModalAddUser, closeModalAddUser] = useModal(false);

  useEffect(() => { loadUsers() }, []);
  useEffect(() => { loadUsersByName() }, [userName]);

  const loadUsers = async () => {
    const response = await fetch('http://localhost:3000/usuario/getlist');
    const data = await response.json()
    setUsers(data);
    //console.log(data);
  }

  const loadUsersByName = async () => {
    if (userName !== '') {
      const response = await fetch("http://localhost:3000/usuario/getbyname/" + userName);
      const data = await response.json();
      setUsers(data);
      //console.log(data);
    }

  }

  const handleSearchUserName = (e) => {
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

      <Modal
        isOpen={modalAddUser}
        closeModal={closeModalAddUser}
      >
        <h3 className='mb-4 text-center'>Nuevo Usuario</h3>
        <form className="row g-3">
          <div className="col-md-6">
            <label for="inputEmail4" className="form-label">Usuario</label>
            <input type="text" className="form-control" id="inputEmail4" />
          </div>
          <div className="col-md-6">
            <label for="inputPassword4" className="form-label">Contraseña</label>
            <input type="password" className="form-control" id="inputPassword4" />
          </div>
          <div className="col-md-12">
            <label for="inputState" className="form-label">Empleado</label>
            <select id="inputState" className="form-select">
              <option selected>Choose...</option>
              <option>...</option>
            </select>
          </div>
          <div className="col-md-6">
            <label for="inputState" className="form-label">Area</label>
            <select id="inputState" className="form-select">
              <option selected>Choose...</option>
              <option>...</option>
            </select>
          </div>
          <div className="col-md-6">
            <label for="inputState" className="form-label">Rol</label>
            <select id="inputState" className="form-select">
              <option selected>Choose...</option>
              <option>...</option>
            </select>
          </div>

          <div className="col-12 d-flex justify-content-end">
            <button type="text" className="btn btn-success ms-1">Registrar</button>
            <button type="submit" className="btn btn-secondary ms-1">Cancelar</button>
          </div>
        </form>
      </Modal>

      <header>
        <h2 className='container-list__h2'>Mantenimiento de usuario</h2>
      </header>

      <div className='container-list'>

        <div className='container-list__header'>
          <h3 className='container-list__h3'>Listado de Usuario</h3>
          <button type="button" className="btn btn-success me-1" onClick={openModalAddUser}>
            <Link>
              <i className="bi bi-plus text--white"></i>
            </Link>
            Nuevo Registro
          </button>
        </div>

        {/* //before SearchNav and next div tenian un container div */}
        <SearchNav
          nameSearch={userName}
          handleSearch={handleSearchUserName}
        />

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

  );
}

export default Usuario;
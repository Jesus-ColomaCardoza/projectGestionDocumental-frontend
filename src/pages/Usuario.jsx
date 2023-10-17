import { useEffect, useState } from 'react';
import '../stylesheets/Usuario.css'
import { Link } from 'react-router-dom';
import { useModal } from '../hookscustom/useModal';
import Modal from '../components/Modal';
import NavWithSearch from '../components/NavWithSearch';
import HeaderWithButton from '../components/HeaderWithButton';
import FormUser from '../components/FormUser';

function Usuario() {

  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState('');
  const [modalAddUser, openModalAddUser, closeModalAddUser] = useModal(false);
  const [modalUpdateUser, openModalUpdateUser, closeModalUpdateUser] = useModal(false);

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

      {/* Modals  */}
      {/* add user Modal */}
      <Modal
        isOpen={modalAddUser}
        closeModal={closeModalAddUser}
      >
        <FormUser 
          title='Nuevo Usuario'
          textButton1='Registrar'
          typeButton1='success'
          handleButton1='addUser'
          textButton2='Cancelar'
          typeButton2='secondary'
          handleButton2={closeModalAddUser}
        />
      </Modal>

      {/* update user Modal */}
      <Modal
        isOpen={modalUpdateUser}
        closeModal={closeModalUpdateUser}
      >
        <FormUser 
          title='Modificación de Usuario'
          textButton1='Modificar'
          typeButton1='danger'
          handleButton1='updateUser'
          textButton2='Cancelar'
          typeButton2='secondary'
          handleButton2={closeModalUpdateUser}
        />
      </Modal>
      {/* ----------- */}

      <header>
        <h2 className='container-list__h2'>Mantenimiento de usuario</h2>
      </header>

      <div className='container-list'>
  
        <HeaderWithButton 
          textNav='Listado de Usuario'
          textButton='Nuevo Registro'
          typeButton='success'
          openModal={openModalAddUser}
        />

        <NavWithSearch
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
                        <button 
                          type="button" 
                          className="btn btn-info me-1"
                          onClick={openModalUpdateUser}>
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
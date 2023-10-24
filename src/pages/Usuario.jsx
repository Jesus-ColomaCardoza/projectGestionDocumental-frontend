import { useEffect, useState } from 'react';
import '../stylesheets/Usuario.css'
import { useModal } from '../hookscustom/useModal';
import Modal from '../components/Modal';
import NavWithSearch from '../components/NavWithSearch';
import HeaderWithButton from '../components/HeaderWithButton';
import FormUserAdd from '../components/FormUserAdd';
import FormUserUpdate from '../components/FormUserUpdate';
import { alertMessage } from '../components/AlertMessage';

const Usuario = () => {

  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState(null);
  const [modalAddUser, openModalAddUser, closeModalAddUser] = useModal(false);
  const [modalUpdateUser, openModalUpdateUser, closeModalUpdateUser] = useModal(false);
  const [employees, setEmployees] = useState([]);
  const [areas, setAreas] = useState([]);

  const loadUsers = async () => {
    const response = await fetch('http://localhost:3000/usuario/getlist');
    const data = await response.json()
    setUsers(data);
    console.log(data);
  }
  const loadUsersByName = async () => {
    if (userName !== '') {
      const response = await fetch("http://localhost:3000/usuario/getbyname/" + userName);
      const data = await response.json();
      setUsers(data);
      //console.log(data);
    }
  }
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
        alertMessage('¡Eliminación exitosa!', 'El usuario has sido eliminado', 'success', 'OK', '#28A745');
      }
    })
  }
  const handleChangeState = async (id, value) => {
    await fetch(`http://localhost:3000/usuario/update/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ state: value }),
      headers: { 'Content-type': 'application/json' }
    });
  }
  const handleChangeStateDom = (e) => {

    let button = e.target.classList.contains('bi') ? e.target.parentElement : e.target;
    let td = button.parentElement;

    if (button.classList.contains('btn-success')) {
      td.parentElement.children[5].firstChild.classList.replace('highlighter--red', 'highlighter--green');
      td.parentElement.children[5].firstChild.textContent = 'activo';
      td.children[2].disabled = true;
      td.children[3].disabled = false;

    } else if (button.classList.contains('btn-danger')) {
      td.parentElement.children[5].firstChild.classList.replace('highlighter--green', 'highlighter--red');
      td.parentElement.children[5].firstChild.textContent = 'bloqueado';
      td.children[2].disabled = false;
      td.children[3].disabled = true;
    }
  }
  const handleSearchUserName = (e) => {
    const name = e.target.value;
    setUserName(name)
    if (name == '') {
      loadUsers()
    }
  }

  useEffect(() => { loadUsers() }, []);
  useEffect(() => { loadUsersByName() }, [userName]);
  useEffect(() => { loadAreas() }, []);
  useEffect(() => { loadEmployees() }, []);

  return (

    <div className='container'>

      {/* Modals  */}
      {/* add user Modal , the handle table get can improve with query to the backend*/}
      <Modal
        title='Nuevo Usuario'
        isOpen={modalAddUser}
        closeModal={closeModalAddUser}
      >
        <FormUserAdd
          textButton1='Registrar'
          textButton2='Cancelar'
          typeButton1='success'
          typeButton2='secondary'
          handleButton2={closeModalAddUser}
          handleTable={loadUsers}
          stateEmployees={employees}
          stateAreas={areas}
        />
      </Modal>

      {/* update user Modal */}
      <Modal
        title='Modificación de Usuario'
        isOpen={modalUpdateUser}
        closeModal={closeModalUpdateUser}
      >
        <FormUserUpdate
          id={userId}
          textButton1='Modificar'
          textButton2='Cancelar'
          typeButton1='danger'
          typeButton2='secondary'
          handleButton2={closeModalUpdateUser}
          handleTable={loadUsers}
          stateEmployees={employees}
          stateAreas={areas}
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
                        <span className={`highlighter highlighter--${user.state == 'activo' ? 'green' : 'red'}`}>
                          {user.state}
                        </span>
                      </td>
                      <td onClick={handleChangeStateDom}>
                        <button
                          type="button"
                          className="btn btn-info me-1"
                          onClick={() => { openModalUpdateUser(), setUserId(user.id) }}>
                          <i className="bi bi-pencil-fill text--white"></i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-warning me-1"
                          onClick={() => { deleteUser(user.id) }}>
                          <i className="bi bi-trash-fill text--white"></i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-success me-1"
                          disabled={user.state == 'activo' ? true : false}
                          onClick={(e) => { handleChangeState(user.id, 'activo') }}>
                          <i className="bi bi-check-circle-fill text--white"></i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger me-1"
                          disabled={user.state == 'bloqueado' ? true : false}
                          onClick={() => { handleChangeState(user.id, 'bloqueado') }}>
                          <i className="bi bi-x-circle-fill text--white"></i>
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
import { useEffect, useState } from 'react';
import '../stylesheets/Usuario.css'
import { useModal } from '../hookscustom/useModal';
import Modal from '../components/Modal';
import NavWithSearch from '../components/NavWithSearch';
import HeaderWithButton from '../components/HeaderWithButton';
import FormEmpleadoAdd from '../components/FormEmpleadoAdd';
import FormUserUpdate from '../components/FormUserUpdate';
import { alertMessage } from '../libraries/alertMessage';

const Empleado = () => {

  const [employees, setEmployees] = useState([]);
  const [employeeName, setEmployeeName] = useState('');

  const [userId, setUserId] = useState(null);
  const [modalAddUser, openModalAddUser, closeModalAddUser] = useModal(false);
  const [modalUpdateUser, openModalUpdateUser, closeModalUpdateUser] = useModal(false);


  const loadEmployeeByName = async () => {
    if (employeeName !== '') {
      const response = await fetch("http://localhost:3000/empleado/getbyname/" + employeeName);
      const data = await response.json();
      setEmployees(data);
      //console.log(data);
    }
  }
  const loadEmployees = async () => {
    const response = await fetch('http://localhost:3000/empleado/getlist/');
    const data = await response.json();
    setEmployees(data);
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
      td.parentElement.children[5].firstChild.textContent = 'inactivo';
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

  useEffect(() => { loadEmployees() }, []);
  useEffect(() => { loadEmployeeByName() }, [employeeName]);

  return (

    <div className='container'>

      {/* Modals  */}
      {/* add user Modal , the handle table get can improve with query to the backend*/}
      <Modal
        title='Nuevo Empleado'
        isOpen={modalAddUser}
        closeModal={closeModalAddUser}
        size='medium'
      >
        <FormEmpleadoAdd
          textButton1='Registrar'
          textButton2='Cancelar'
          typeButton1='success'
          typeButton2='secondary'
          handleButton2={closeModalAddUser}
          handleTable={loadEmployees}
        />
      </Modal>

      {/* update user Modal */}
      {/* <Modal
        title='Modificación de Empleado'
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
      </Modal> */}
      {/* ----------- */}

      <header>
        <h2 className='container-list__h2'>Mantenimiento de empleados</h2>
      </header>

      <div className='container-list'>

        <HeaderWithButton
          textNav='Listado de Empleado'
          textButton='Nuevo Registro'
          typeButton='success'
          openModal={openModalAddUser}
        />

        <NavWithSearch
          nameSearch={employeeName}
          handleSearch={handleSearchUserName}
        />

        <div className='custom-scroll'>
          <table className="table table-hover dd">
            <thead className='custom-sticky table-light'>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Foto</th>
                <th scope="col">Nro documento</th>
                <th scope="col">Empleado</th>
                <th scope="col">Teléfono</th>
                <th scope="col">Correo</th>
                <th scope="col">Dirección</th>
                <th scope="col">Estatus</th>
                <th scope="col" className='col-2'>Optiones</th>
              </tr>
            </thead>
            <tbody>
              {
                employees.map((employee, index) => {
                  return (
                    <tr key={employee.id}>
                      <th scope="row">{index + 1}</th>
                      <td>{employee.profile_photo}</td>
                      <td>{employee.nro_document}</td>
                      <td>
                        {
                          employee.employee_name + ' ' +
                          employee.paternal_surname + ' ' +
                          employee.maternal_surname
                        }
                      </td>
                      <td>{employee.phone}</td>
                      <td>{employee.email}</td>
                      <td>{employee.address}</td>
                      <td>
                        <span className={`highlighter highlighter--${employee.state == 'activo' ? 'green' : 'red'}`}>
                          {employee.state}
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

export default Empleado;
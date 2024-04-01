import { useEffect, useState } from 'react';
import '../stylesheets/Usuario.css'
import '../stylesheets/FormEmpleadoAdd.css'
import { useModal } from '../hookscustom/useModal';
import Modal from '../components/Modal';
import NavWithSearch from '../components/NavWithSearch';
import HeaderWithButton from '../components/HeaderWithButton';
import FormEmpleadoAdd from '../components/FormEmpleadoAdd';
import FormEmpleadoUpdate from '../components/FormEmpleadoUpdate';
import { alertMessage } from '../libraries/alertMessage';
import { removeDomain } from '../libraries/application';

let initialStateEmployees;

const Empleado = () => {

  const [employees, setEmployees] = useState([]);
  const [employeeName, setEmployeeName] = useState('');

  const [employeeId, setEmployeeId] = useState(null);
  const [employeeImage, setEmployeeImage] = useState(null);
  const [modalAddEmployee, openModalAddEmployee, closeModalAddEmployee] = useModal(false);
  const [modalUpdateEmployee, openModalUpdateEmployee, closeModalUpdateEmployee] = useModal(false);

  const [areas, setAreas] = useState([]);



  const loadEmployeeByName = async () => {
    if (employeeName !== '') {
      // const response = await fetch("http://localhost:3000/empleado/getbyname/" + employeeName);
      //  const data = await response.json();
      // setEmployees(data);
      // console.log(data);

      // let arrayNameEmployees=employees.map(name=> name.employee_name+' '+name.paternal_surname+' '+name.maternal_surname);

      let arrayFilterByName = employees.filter(name => (name.employee_name + ' ' + name.paternal_surname + ' ' + name.maternal_surname).includes(employeeName))
      setEmployees(arrayFilterByName)
      // console.log(arrayFilterByName);
    }
  }
  const loadEmployees = async () => {
    const response = await fetch('http://localhost:3000/empleado/getlist/');
    const data = await response.json();
    console.log(data);
    setEmployees(data);
    initialStateEmployees = [...data]
    // console.log(initialStateEmployees);
  }
  const loadAreas = async () => {
    const response = await fetch('http://localhost:3000/area/getlist/');
    const data = await response.json();
    setAreas(data);
    console.log(data);
  }

  const deleteEmployee = async (id, image) => {
    // console.log(id);
    // console.log(image);
    Swal.fire({
      title: '¿Está seguro de eliminar este empleado?',
      text: "¡No podrá revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28A745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await fetch("http://localhost:3000/empleado/delete/" + id + '/' + image, {
          method: "DELETE",
        });
        setEmployees(employees.filter(employee => employee.id !== id));
        alertMessage('¡Eliminación exitosa!', 'El empleado ha sido eliminado', 'success', 'OK', '#28A745');
      }
    })
  }

  const handleSearchEmployeeName = (e) => {
    const name = e.target.value;
    setEmployeeName(name)
    setEmployees(initialStateEmployees)
    if (name == '') {
      loadEmployees();
    }
  }

  useEffect(() => { loadEmployees() }, []);
  useEffect(() => { loadEmployeeByName() }, [employeeName]);
  useEffect(() => { loadAreas() }, []);

  return (

    <div className='container'>

      {/* Modals  */}
      {/* add user Modal , the handle table get can improve with query to the backend*/}
      <Modal
        title='Nuevo Empleado'
        isOpen={modalAddEmployee}
        closeModal={closeModalAddEmployee}
        size='medium'
      >
        <FormEmpleadoAdd
          textButton1='Registrar'
          textButton2='Cancelar'
          typeButton1='success'
          typeButton2='secondary'
          handleButton2={closeModalAddEmployee}
          handleTable={loadEmployees}
          stateAreas={areas}

        />
      </Modal>

      {/* update user Modal */}
      <Modal
        title='Modificación de Empleado'
        isOpen={modalUpdateEmployee}
        closeModal={closeModalUpdateEmployee}
        size='medium'
      >
        <FormEmpleadoUpdate
          id={employeeId}
          image={employeeImage}
          textButton1='Modificar'
          textButton2='Cancelar'
          typeButton1='danger'
          typeButton2='secondary'
          handleButton2={closeModalUpdateEmployee}
          handleTable={loadEmployees}
        />
      </Modal>
      {/* ----------- */}

      <header>
        <h2 className='container-list__h2'>Mantenimiento de empleados</h2>
      </header>

      <div className='container-list'>

        <HeaderWithButton
          textNav='Listado de Empleado'
          textButton='Nuevo Registro'
          typeButton='success'
          openModal={openModalAddEmployee}
        />

        <NavWithSearch
          nameSearch={employeeName}
          handleSearch={handleSearchEmployeeName}
        />

        <div className='custom-scroll'>
          <table className="table table-hover">
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
                      <td>
                        <div className='default-photo__container default-photo__container--td'>
                          <img src={employee.profile_photo} alt={employee.employee_name} />
                        </div>
                      </td>

                      <td>{employee.nro_document}</td>
                      <td>
                        {
                          employee.employee_name + ' ' +
                          employee.paternal_surname + ' ' +
                          employee.maternal_surname
                        }
                      </td>
                      <td>{employee.phone}</td>
                      <td className='text-break'>{employee.email}</td>
                      <td>{employee.address}</td>
                      <td>
                        <span className={`highlighter highlighter--${employee.state == 'activo' ? 'green' : 'red'}`}>
                          {employee.state}
                        </span>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-info me-1"
                          onClick={() => {
                            openModalUpdateEmployee();
                            setEmployeeId(employee.id);
                            setEmployeeImage(removeDomain(employee.profile_photo))
                          }}>
                          <i className="bi bi-pencil-fill text--white"></i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-warning me-1"
                          onClick={() => {
                            deleteEmployee(
                              employee.id,
                              removeDomain(employee.profile_photo)
                            )
                          }}>
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
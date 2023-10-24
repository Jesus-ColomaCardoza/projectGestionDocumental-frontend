import React, { useState } from 'react';
import { alertMessage } from './AlertMessage';

const FormAreaAdd = ({
  textButton1,
  textButton2,
  typeButton1,
  typeButton2,
  handleButton2,
  handleTable,
}) => {

  const initialAreaDates = {
    area_name: '',
    state: ''
  }
  const [area, setArea] = useState(initialAreaDates)

  const handleChange = (e) => {
    setArea({ ...area, [e.target.name]: e.target.value });
  };

  const addArea = async (e) => {
    //falta implementar : cuando un usuario no se registro correctamente no se valida, se debe mostrar error 
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/area/create/', {
        method: 'POST',
        body: JSON.stringify(area),
        headers: { 'Content-Type': "application/json" }
      })
      //we reset the add user form
      e.target.reset();
      //we show the confirmed modal  
      alertMessage('Registro exitoso!', 'El área ha sido registrada', 'success', 'OK', '#28A745');
    } catch (error) {
      alertMessage('Error!', error, 'error', 'OK', '#d33');
      console.log(error);
    }
    //we close the modal window
    handleButton2();
    //cambiar el estado de la tabla user
    handleTable();
    //reset el object userDates
    setArea(initialAreaDates)
  }

  return (
    <>
      <form className="row g-3" onSubmit={addArea}>
        <div className="col-md-12">
          <label htmlFor="inputAreaName" className="form-label">Área</label>
          <input type="text" className="form-control" name='area_name' onChange={handleChange} />
        </div>
        <div className="col-md-12">
          <label className="form-label">Estatus</label>
          <select className="form-select" name='state' onChange={handleChange}>
            <option key={-1}>Seleccionar estado</option>
            <option key={0} value={'activo'}>activo</option>
            <option key={1} value={'bloqueado'}>bloqueado</option>
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

export default FormAreaAdd
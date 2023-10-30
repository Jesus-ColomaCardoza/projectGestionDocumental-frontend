import React, { useState } from 'react';
import { alertMessage } from '../libraries/alertMessage';

const FormAreaAdd = ({
  textButton1,
  textButton2,
  typeButton1,
  typeButton2,
  handleButton2,
  handleTable,
  allAreas
}) => {

  const initialAreaDates = {
    area_name: '',
  }
  const [area, setArea] = useState(initialAreaDates)

  const handleChange = (e) => {
    setArea({ ...area, [e.target.name]: e.target.value });
  };

  const searchAreaByName = (name) => {
    const areaNames = allAreas.map(name => name.area_name.toLowerCase());
    return areaNames.includes(name);
  }

  const addArea = async (e) => {
    e.preventDefault();
    // console.log(area);
    try {
      if (!searchAreaByName(area.area_name.toLowerCase()) && !area.area_name == '') {
        const response = await fetch('http://localhost:3000/area/create/', {
          method: 'POST',
          body: JSON.stringify(area),
          headers: { 'Content-Type': "application/json" }
        })
        //we show the confirmed modal  
        alertMessage('Registro exitoso!', 'El área ha sido registrada', 'success', 'OK', '#28A745');
      } else {
        throw new Error('El área ingresada ya existe')
      }
    } catch (error) {
      alertMessage('Error!', error, 'error', 'OK', '#d33');
      console.log(error);
    }
    //we reset the add user form
    e.target.reset();
    //we close the modal window
    handleButton2();
    //cambiar el estado de la tabla user
    handleTable();
    //reset el object userDates
    setArea(initialAreaDates);
  }

  return (
    <>
      <form className="row g-3" onSubmit={addArea}>
        <div className="col-md-12">
          <label htmlFor="inputAreaName" className="form-label">Área</label>
          <input required type="text" className="form-control" name='area_name' onChange={handleChange} />
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
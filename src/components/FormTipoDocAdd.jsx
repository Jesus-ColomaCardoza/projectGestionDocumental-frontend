import React, { useState } from 'react';
import { alertMessage } from '../libraries/alertMessage';

const FormTipoDocAdd = ({
  textButton1,
  textButton2,
  typeButton1,
  typeButton2,
  handleButton2,
  handleTable,
  allTiposDoc
}) => {

  const initialTiposDocDates = {
    description: '',
  }
  const [tipoDoc, setTipoDoc] = useState(initialTiposDocDates)

  const handleChange = (e) => {
    setTipoDoc({ ...tipoDoc, [e.target.name]: e.target.value });
  };

  const searchTipoDocumentoByName = (name) => {
    const tipoDocNames = allTiposDoc.map(name => name.description.toLowerCase());
    return tipoDocNames.includes(name);
  }

  const addTipoDocumento = async (e) => {
    e.preventDefault();
    // console.log(tipoDoc);
    try {
      if (!searchTipoDocumentoByName(tipoDoc.description.toLocaleLowerCase()) &&
        !tipoDoc.description == '') {
        const response = await fetch('http://localhost:3000/tipodocumento/create/', {
          method: 'POST',
          body: JSON.stringify(tipoDoc),
          headers: { 'Content-Type': "application/json" }
        })
        //we show the confirmed modal  
        alertMessage('Registro exitoso!', 'Tipo de documento ha sido registrada', 'success', 'OK', '#28A745');
      } else {
        throw new Error('El tipo de documento ingresado ya existe')
      }
    } catch (error) {
      alertMessage('Error!', error, 'error', 'OK', '#d33');
      // console.log(error);
    }
    //we reset the add user form
    e.target.reset();
    //we close the modal window
    handleButton2();
    //cambiar el estado de la tabla user
    handleTable();
    //reset el object userDates
    setTipoDoc(initialTiposDocDates);
  }

  return (
    <>
      <form className="row g-3" onSubmit={addTipoDocumento}>
        <div className="col-md-12">
          <label htmlFor="inputAreaName" className="form-label">Tipo de documento</label>
          <input required type="text" className="form-control" name='description' onChange={handleChange} />
        </div>
        <div className="col-12 d-flex justify-content-end">
          <button type="submit" className={`btn btn-${typeButton1} ms-1`}>{textButton1}</button>
          <button type="button" className={`btn btn-${typeButton2} ms-1`} onClick={handleButton2}>{textButton2}</button>
        </div>
      </form>
    </>
  )
}

export default FormTipoDocAdd
import React, { useState,useEffect } from 'react';
import { alertMessage } from '../libraries/alertMessage';

const FormTipoDocUpdate = ({
  id,
  textButton1,
  textButton2,
  typeButton1,
  typeButton2,
  handleButton2,
  handleTable,
}) => {

  const initialTiposDocDates = {
    description: '',
    state: ''
  }
  const [tipoDoc, setTipoDoc] = useState(initialTiposDocDates)

  const handleChange = (e) => {
    setTipoDoc({ ...tipoDoc, [e.target.name]: e.target.value });
  };

  const updateTipoDocumento = async (e) => {
    //falta implementar : cuando un usuario no se registro correctamente no se valida, se debe mostrar error 
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/tipodocumento/update/${id}`, {
        method: 'PUT',
        body: JSON.stringify(tipoDoc),
        headers: { 'Content-Type': "application/json" }
      })
      //we reset the add user form
      e.target.reset();
      //we show the confirmed modal  
      alertMessage('Modificación exitoso!', 'Tipo de documento ha sido modificado', 'success', 'OK', '#28A745');
    } catch (error) {
      alertMessage('Error!', error, 'error', 'OK', '#d33');
      console.log(error);
    }
    //we close the modal window
    handleButton2();
    //cambiar el estado de la tabla user
    handleTable();
  }

  const getDatesTipoDocumento = async () => {
    // console.log(id);
    try {
      const response = await fetch(`http://localhost:3000/tipodocumento/get/${id}`);
      const data = await response.json();
      setTipoDoc(data)
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => { id != null ? getDatesTipoDocumento(id) : false }, [id]);


  return (
    <>
      <form className="row g-3" onSubmit={updateTipoDocumento}>
        <div className="col-md-12">
          <label htmlFor="inputAreaName" className="form-label">Tipo de documento</label>
          <input type="text" className="form-control" name='description' onChange={handleChange} value={tipoDoc.description}/>
        </div>
        <div className="col-md-12">
          <label className="form-label">Estatus</label>
          <select className="form-select" name='state' onChange={handleChange} value={tipoDoc.state}>
            <option disabled key={-1}>Seleccionar estado</option>
            <option key={0} value={'activo'}>activo</option>
            <option key={1} value={'inactivo'}>inactivo</option>
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

export default  FormTipoDocUpdate;

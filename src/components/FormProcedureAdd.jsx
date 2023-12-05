import React, { useState,useEffect } from 'react';
import { alertMessage } from '../libraries/alertMessage';

const FormProcedureAdd = ({
  textButton1,
  textButton2,
  typeButton1,
  typeButton2,
  handleButton2,
  setData
}) => {

  const initialProcedureDates = {
    id: '',
    subject: '',
    observation: '',
    createdAt: '',
    state: '',// in back end (en tramite/archivado/finalizado)
    current_area: ''//
  }

  const [procedure, setProcedure] = useState(initialProcedureDates)



  const handleChange = (e) => {
    setProcedure({ ...procedure, [e.target.name]: e.target.value });

  };

  const addProcedure = async (e) => {
    e.preventDefault();

    try {

      //we add the current date
      procedure.createdAt = Date.now();
      //we add the initial state
      procedure.state = 'en tramite';

      setData(procedure)

      //we show the confirmed modal  
      alertMessage('Registro exitoso!', 'El empleado has sido registrado', 'success', 'OK', '#28A745');

      //we close the modal window
      handleButton2();

    } catch (error) {
      alertMessage('Error!', error, 'error', 'OK', '#d33');
      console.log(error);
    }
  }


  return (
    <>
      <form className="row g-2 px-3" encType="multipart/form-data" onSubmit={addProcedure}>
        <div className="col-6">
          <label htmlFor="cod_procedure" className="">Código de Trámite</label>
          <input required type="text" className="form-control" name='id' id='cod_procedure' onChange={handleChange} value={procedure.id} />
        </div>
        <div className="col-12">
          <label htmlFor="inputEmail4" className="form-label">Asunto</label>
          <input required type="text" className="form-control" name='subject' onChange={handleChange} value={procedure.subject} />
        </div>
        <div className="col-12">
          <label htmlFor="inputEmail4" className="form-label">Observación</label>
          <textarea className="form-control" name='observation' onChange={handleChange} rows="3" value={procedure.observation}></textarea>
        </div>
        <div className="col-12 text-end pt-1 ">
          <button type="submit" className={`btn btn-${typeButton1} ms-1`}>{textButton1}</button>
          <button type="button" className={`btn btn-${typeButton2} ms-1`} onClick={handleButton2}>{textButton2}</button>
        </div>
      </form>
    </>
  )
}

export default FormProcedureAdd
import React, { useState } from 'react';
import { alertMessage } from '../libraries/alertMessage';

const FormSenderAdd = ({
  textButton1,
  textButton2,
  typeButton1,
  typeButton2,
  handleButton2,
  setData,
}) => {

  const initialSenderDates = {
    nro_document: '',
    sender_name: '',
    paternal_surname: '',
    maternal_surname: '',
    date_birth: '',
    phone: '',
    email: '',
    address: '',
    representation: '',
    ruc: '',
    business_name: ''
  }

  const [sender, setSender] = useState(initialSenderDates)


  const handleChange = (e) => {
    setSender({ ...sender, [e.target.name]: e.target.value });
  };

  const handleChangeRadioButton = (e) => {
    setSender({ ...sender, [e.target.name]: e.target.value });
    const legalEntity = document.getElementById('legalEntity');
    e.target.value == 'Persona jurídica' ?
      legalEntity.classList.remove('d-none') :
      legalEntity.classList.add('d-none')

  }
  const addSender = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch('http://localhost:3000/remitente/create/', {
        method: 'POST',
        body: JSON.stringify(sender),
        headers: { 'Content-Type': "application/json" }
      })

      setData(sender)
      //console.log(sender);

      //reset el object senderDates
      setSender(initialSenderDates);

      //reset the form
      e.target.reset();

      //we show the confirmed modal  
      alertMessage('Registro exitoso!', 'El remitente has sido registrado', 'success', 'OK', '#28A745');

      //we close the modal window
      handleButton2();

    } catch (error) {
      alertMessage('Error!', error, 'error', 'OK', '#d33');
      console.log(error);
    }
  }

  return (
    <>
      <form className="row g-2 px-3" encType="multipart/form-data" onSubmit={addSender}>
        <div className="col-4">
          <label htmlFor="nro_document" className="">Nro Documento</label>
          <input required type="text" className="form-control" name='nro_document' id='nro_document' onChange={handleChange} />
        </div>
        <div className="col-8">
          <label htmlFor="inputEmail4" className="form-label">Nombres</label>
          <input required type="text" className="form-control" name='sender_name' onChange={handleChange} />
        </div>
        <div className="col-6">
          <label htmlFor="inputEmail4" className="form-label">Apellido Paterno</label>
          <input required type="text" className="form-control" name='paternal_surname' onChange={handleChange} />
        </div>
        <div className="col-6">
          <label htmlFor="inputEmail4" className="form-label">Apellido Materno</label>
          <input required type="text" className="form-control" name='maternal_surname' onChange={handleChange} />
        </div>
        <div className="col-6">
          <label htmlFor="inputEmail4" className="form-label">Fecha de Nacimiento</label>
          <input required type="date" className="form-control" name='date_birth' onChange={handleChange} />
        </div>
        <div className="col-6">
          <label htmlFor="inputEmail4" className="form-label">Teléfono</label>
          <input required type="text" className="form-control" name='phone' onChange={handleChange} />
        </div>
        <div className="col-6">
          <label htmlFor="inputEmail4" className="form-label">Correo</label>
          <input required type="email" className="form-control" name='email' onChange={handleChange} />
        </div>
        <div className="col-6">
          <label htmlFor="inputEmail4" className="form-label">Dirección</label>
          <input required type="text" className="form-control" name='address' onChange={handleChange} />
        </div>
        <div className="col-12">
          <label htmlFor="inputEmail4" className="form-label d-block">En Representación</label>
          <div className="row">
            <div className="col-4 text-center">
              <input required type="radio" name="representation" id="toOwnName" value={'A nombre propio'} className="form-check-input" onChange={handleChangeRadioButton} />
              <label htmlFor="toOwnName" className="form-check-label">A nombre propio</label>
            </div>
            <div className="col-4 text-center">
              <input required type="radio" name="representation" id="toOtherNaturalPerson" value={'A otra persona natural'} className="form-check-input" onChange={handleChangeRadioButton} />
              <label htmlFor="toOtherNaturalPerson" className="form-check-label">A otra persona natural</label>
            </div>
            <div className="col-4 text-center">
              <input required type="radio" name="representation" id="JuridicPerson" value={'Persona jurídica'} className="form-check-input" onChange={handleChangeRadioButton} />
              <label htmlFor="JuridicPerson" className="form-check-label">Persona jurídica</label>
            </div>
          </div>
        </div>
        <div className='row d-none' id='legalEntity'>
          <div className="col-6">
            <label htmlFor="inputEmail4" className="form-label">RUC</label>
            <input type="text" className="form-control" name='ruc' onChange={handleChange} />
          </div>
          <div className="col-6">
            <label htmlFor="inputEmail4" className="form-label">Razón Social</label>
            <input type="text" className="form-control" name='business_name' onChange={handleChange} />
          </div>
        </div>
        <div className="col-12 text-end pt-1 ">
          <button type="submit" className={`btn btn-${typeButton1} ms-1`}>{textButton1}</button>
          <button type="button" className={`btn btn-${typeButton2} ms-1`} onClick={handleButton2}>{textButton2}</button>
        </div>
      </form>
    </>
  )
}

export default FormSenderAdd
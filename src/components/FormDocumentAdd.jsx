import React, { useState, useEffect } from 'react';
import { alertMessage } from '../libraries/alertMessage';

const FormDocumentAdd = ({
  textButton1,
  textButton2,
  typeButton1,
  typeButton2,
  handleButton2,
  documents,
  typeSource
}) => {

  const initialDocumentDates = {
    id: '',
    subject: '',
    file: '',//
    state: '', // in back end (firmado/sin firmar)
    type_document: '',
    type_source: '',
    createdAt: '',
    id_procedure: ''//
  }

  const [tiposDocumento, setTiposDocumento] = useState([]);
  const [document, setDocument] = useState(initialDocumentDates)

  const [file, setFile] = useState(null);//it save the file with all properties


  const handleChange = (e) => {
    setDocument({ ...document, [e.target.name]: e.target.value });
    console.log(document);
  };

  const handleSelectedFile = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    } 
  }

  const addDocument = async (e) => {

    e.preventDefault();

    try {

      //we add the current date
      document.createdAt = Date.now();
      document.type_source = typeSource;
      document.state = 'sin firmar';
      document.file = file;

      documents.push(document);

      //reset the form
      e.target.reset();

      //reset the object documentDates
      setDocument(initialDocumentDates);

      //we show the confirmed modal  
      alertMessage('Registro exitoso!', 'El empleado has sido registrado', 'success', 'OK', '#28A745');

      //we close the modal window
      handleButton2();

    } catch (error) {
      alertMessage('Error!', error, 'error', 'OK', '#d33');
    }
  }


  const loadTiposDocumento = async () => {
    const response = await fetch('http://localhost:3000/tipodocumento/getlist/');
    const data = await response.json();
    setTiposDocumento(data);
    // console.log(data);
  }

  useEffect(() => { loadTiposDocumento() }, []);


  return (
    <>
      <form className="row g-2 px-3" encType="multipart/form-data" onSubmit={addDocument}>
        <div className="col-12 col-md-7">
          <label className="form-label">Tipo de Documento</label>
          <select className="form-select" name='type_document' onChange={handleChange} defaultValue={-1}>
            <option disabled key={-1} value={-1}>Seleccionar tipo de documento</option>
            {
              tiposDocumento.map((td) => {
                return <option key={td.id} value={td.id} >{td.description}</option>
              })
            }
          </select>
        </div>
        <div className="col-12 col-md-5">
          <label htmlFor="id" className="">Código de Documento</label>
          <input required type="text" className="form-control" name='id' id='id' onChange={handleChange} />
        </div>
        <div className="col-12">
          <label htmlFor="subject" className="form-label">Asunto</label>
          <textarea required className="form-control" name='subject' onChange={handleChange} rows="2"></textarea>
        </div>
        <div className="col-12 col-md-12 ">
          <label htmlFor="document" className="form-label">Selecionar documento</label>
          <input required single='true' type="file" className="form-control" name='document' id='document' accept='.pdf' onChange={handleSelectedFile} />
        </div>
        <div className="col-12 text-end pt-1 ">
          <button type="submit" className={`btn btn-${typeButton1} ms-1`}>{textButton1}</button>
          <button type="button" className={`btn btn-${typeButton2} ms-1`} onClick={handleButton2}>{textButton2}</button>
        </div>
      </form>
    </>
  )
}

export default FormDocumentAdd
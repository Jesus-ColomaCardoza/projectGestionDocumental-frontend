import React, { useState, useEffect } from 'react';
import { getDateTime } from '../libraries/application';
import pdf from '../assets/media/img/pdf.png'
import { useModal } from '../hookscustom/useModal';
import Modal from './Modal';
import { alertMessage } from '../libraries/alertMessage';

const ListDocuments = ({
  title,
  setTypeSource,
  openModalAddDocument,
  documents,
  setDocuments,
  filter
}) => {

  const data = documents.filter((document) => document.type_source == filter)

  const [viewFile, setviewFile] = useState(null);

  const [modalViewPdf, openViewPdf, closeViewPdf] = useModal(false);


  const handleViewFile = (index) => { //correguir con id y data->documents
    if (data[index].file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setviewFile(e.target.result);
      }
      reader.readAsDataURL(data[index].file);
    } else {
      setviewFile(null);
    }
  }

  const deleteDocument = (id) => {
    setDocuments(documents.filter((document) => document.id !== id));
  }



  return (
    <>
      <Modal
        title='Documento PDF'
        isOpen={modalViewPdf}
        closeModal={closeViewPdf}
        size='medium'
      >
        <section className="row">
          <embed className=" px-0 bg-secondary" src={viewFile} type="application/pdf" width="450" height="450" />
        </section>
      </Modal>

      <div className='d-flex justify-content-between align-items-center border-bottom border-secondary py-1'>
        <h4 className='m-0 fs-6 d-inline align-middle'>{title}</h4>
        <button className="btn btn-info py-1" onClick={() => {
          setTypeSource(filter)
          openModalAddDocument();
        }}>
          <i className="bi bi-file-earmark-arrow-up-fill"></i>
        </button>
      </div>

      <ul className="list-group list-group-flush">
        {
          data.map((document, index) => {
            return (
              <li className="list-group-item py-0" key={document.id}>
                <div className="row">
                  <div className='col-1 p-0 d-flex align-items-center'>
                    <img src={pdf} alt="image pdf" />
                  </div>
                  <div className="col-10">
                    <p className='m-0'>{index + 1 + '.  ' + document.subject + '-' + document.type_source + '-' + document.state}</p>
                    <small className='m-0'>Fecha de registro <i>{getDateTime(document.createdAt)}</i></small>
                  </div>
                  <div className="dropdown col-1 d-flex align-items-center">
                    <button className="btn border-0 py-1" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <i className="bi bi-three-dots-vertical"></i>
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <button className="dropdown-item" onClick={() => {
                          handleViewFile(index);
                          openViewPdf();
                        }}>
                          <i className="bi bi-eye-fill me-2 text-secondary"></i>
                          Ver documento
                        </button>
                      </li>
                      <li>
                        <button className="dropdown-item" href="#">
                          <i className="bi bi-pen-fill me-2 text-primary"></i>
                          Firmar
                        </button>
                      </li>
                      <li>
                        <button className="dropdown-item" onClick={() => {
                          alert(document.id)
                          deleteDocument(document.id);
                        }}>
                          <i className="bi bi-dash-circle-fill me-2 text-danger"></i>
                          Eliminar
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            );

          })
        }
      </ul>
    </>
  )
}

export default ListDocuments
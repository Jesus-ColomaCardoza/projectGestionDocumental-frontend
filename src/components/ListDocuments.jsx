import { getDateTime } from '../libraries/application';
import pdf from '../assets/media/img/pdf.png'

const ListDocuments = ({
  title,
  setTypeSource,
  openModalAddDocument,
  documents,
  filter
}) => {

  const data = documents.filter((document) => document.type_source == filter)

  return (
    <>
      <div className='d-flex justify-content-between align-items-center border-bottom border-secondary pb-1'>
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
                    <p className='m-0'>{index + 1 + '.  ' + document.subject + ' ' + document.type_source}</p>
                    <small className='m-0'>Fecha de registro <i>{getDateTime(document.createdAt)}</i></small>
                  </div>
                  <div className="dropdown col-1 d-flex align-items-center">
                    <button className="btn border-0 py-1" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <i className="bi bi-three-dots-vertical"></i>
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="#">
                          <i className="bi bi-pen-fill me-2 text-primary"></i>
                          Firmar
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          <i className="bi bi-dash-circle-fill me-2 text-danger"></i>
                          Eliminar
                        </a>
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
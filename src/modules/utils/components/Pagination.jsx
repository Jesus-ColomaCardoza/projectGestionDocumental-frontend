import '../stylesheets/Pagination.css'
const Pagination = ({
  currentPage,
  setCurrentPage,
  nPages,
  indexInitial,
  indexFinal
}) => {

  const next = () => {
    currentPage < nPages ? setCurrentPage(currentPage + 1) : false
  }
  const previous = () => {
    currentPage > 1 ? setCurrentPage(currentPage - 1) : false
  }

  return (
    <>
      <div aria-label="Page navigation" className='mt-3 p-2 d-flex justify-content-between align-items-center  border-top  border-text-body-secondary'>
        <div>
          <p className='m-0'>Mostrando del ({indexInitial+1 + ' al '+indexFinal}) total de {(indexFinal-indexInitial)*nPages} registros</p>
        </div>
        <ul className="pagination justify-content-end border-0 m-0">
          <li className="page-item page-link bg-body-secondary" onClick={previous}>
            <i className="bi bi-caret-left-fill"></i>
          </li>
          <li className="page-item page-link">{currentPage} de {nPages}</li>
          <li className="page-item page-link bg-body-secondary" onClick={next}>
            <i className="bi bi-caret-right-fill"></i>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Pagination
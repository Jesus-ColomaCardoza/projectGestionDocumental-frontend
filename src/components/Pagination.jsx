import '../stylesheets/Pagination.css'
const Pagination = ({
  currentPage,
  setCurrentPage,
  nPages
}) => {

  const next = () => {
    currentPage < nPages ? setCurrentPage(currentPage + 1) : false
  }
  const previous = () => {
    currentPage > 1 ? setCurrentPage(currentPage - 1) : false
  }

  return (
    <>
      <div aria-label="Page navigation">
        <ul className="pagination justify-content-end py-2 pe-3">
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
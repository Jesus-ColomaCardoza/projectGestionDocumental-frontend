import '../stylesheets/Usuario.css'


function Usuario() {
  return (

    <div className='container'>
      <header>
        <h2 className='container-list__h2'>Mantenimiento de usuario</h2>
      </header>
      <div className='container-list'>
        <h3 className='container-list__h3'>Listado de Usuario</h3>
        <div>

          <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">Navbar</a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="bi bi-list"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">Home</a>
                  </li>
                </ul>
                <form className="d-flex" role="search">
                  <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-success" type="submit">Search</button>
                </form>
              </div>
            </div>
          </nav>

          <div className='custom-scroll'>
            <table className="table table-hover">
              <thead className='custom-sticky table-light'>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First</th>
                  <th scope="col">Last</th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Thornton</td>
                  <td>@fat</td>
                  <td>@twitter</td>
                </tr>
                
              </tbody>


            </table>
          </div>

        </div>
      </div>
    </div>
  );
}
export default Usuario;
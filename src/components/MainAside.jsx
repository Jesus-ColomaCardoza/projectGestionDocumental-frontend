import { Link } from 'react-router-dom';
import logo from '../assets/img/AdminLTELogo.png'


function MainAside() {
  return (

      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* aside's header */}
        <Link to="/home" className="brand-link">
          <img src={logo} alt="AdminLTE Logo" className="brand-image img-circle elevation-3" />
          <span className="brand-text font-weight-light">MDSMF</span>
        </Link>

        {/* User dates */}
        <div className="sidebar">
        {/* replace user-panel class so that name can auto resize */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex"> 
            <div className="image">
              <img src={logo} className="img-circle elevation-2" alt="User Image" />
            </div>
            <div className="info">
              <a href="#" className="">Hellary Jesus Coloma Cardoza</a>
            </div>
          </div>

          {/* Options of navegation */}
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

              <li className="nav-item">
                <Link to="/home/tramite" className="nav-link">
                  <i className="nav-icon fas fa-book"></i>
                  <p>Trámite</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/home/usuario" className="nav-link">
                  <i className="nav-icon fas fa-user"></i>
                  <p>Usuario</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/home/empleado" className="nav-link">
                  <i className="nav-icon fas fa-users"></i>
                  <p>Empleado</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/home/area" className="nav-link">
                  <i className="nav-icon fas fa-th"></i>
                  <p>Área</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/home/tipodocumento" className="nav-link">
                  <i className="nav-icon fas fa-th"></i>
                  <p>Tipo de Documento</p>
                </Link>
              </li>

            </ul>
          </nav>
        </div>

      </aside>
  );
}
export default MainAside;
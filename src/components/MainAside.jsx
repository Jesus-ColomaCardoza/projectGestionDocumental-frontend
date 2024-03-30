import { Link } from 'react-router-dom';
import logo from '../assets/media/img/AdminLTELogo.png'
import { useContext } from 'react';
import UserContext from '../contexts/UserContext';


function MainAside() {

  //update this method:
  const sidebarMini = document.querySelector('.sidebar-mini');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  sidebarOverlay.addEventListener('click', () => {
    sidebarMini.classList.replace('sidebar-open', 'sidebar-closed')
    sidebarMini.classList.add('sidebar-collapse')
  })

  const { user } = useContext(UserContext)

  return (

    <aside className="main-sidebar sidebar-dark-primary custom-fixed">
      {/* aside's header */}
      <Link to="/home" className="brand-link">
        <img src={logo} alt="AdminLTE Logo" className="brand-image img-circle elevation-3" />
        <span className="brand-text font-weight-light">MDSMF</span>
      </Link>

      {/* User dates */}
      <div className="sidebar">
        {/* replace user-panel class so that name can auto resize */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image d-flex">
            <img src={user.Empleado.profile_photo} className="img-circle elevation-2" alt="User Image" />
            <a href="#" id="userName" className="info">{
              user.Empleado.employee_name + ' ' +
              user.Empleado.paternal_surname + ' ' +
              user.Empleado.maternal_surname
            }</a>
          </div>

        </div>

        {/* Options of navegation */}
        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

            <li class="nav-header">ARCHIVOS DIGITALES</li>

            <li className="nav-item">
              <Link to="/home/tramite/lista" className="nav-link">
                <i className="nav-icon fas fa-book"></i>
                <p>Documentos de área</p>
              </Link>
            </li>

            <li class="nav-header">TRÁMITES</li>

            <li className="nav-item">
              <Link to="/home/tramite/lista" className="nav-link">
                <i className="nav-icon fas fa-book"></i>
                <p>Trámite</p>
              </Link>
            </li>

            {
              user.user_type == 'admin' ?
                (
                  <>
                    <li class="nav-header">CONFIGURACIÓN</li>

                    <li class="nav-item">
                      <a href="#" class="nav-link">
                        <i class="nav-icon fas fa-tachometer-alt"></i>
                        <p>
                          Mantenimiento
                          <i class="right fas fa-angle-left"></i>
                        </p>
                      </a>

                      <ul class="nav nav-treeview">
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
                    </li>
                  </>
                )
                : false
            }

          </ul>
        </nav>
      </div>

    </aside>
  );
}
export default MainAside;
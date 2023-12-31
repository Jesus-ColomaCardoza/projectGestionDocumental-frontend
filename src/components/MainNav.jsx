import { Link, useNavigate } from "react-router-dom";
import { useContext } from 'react';
import UserContext from '../contexts/UserContext';



function MainNav() {

  const { user } = useContext(UserContext)
  const navigate= useNavigate();

  const signOut = () => {
    // console.log('sign out');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('auth');
    navigate('/');
  }

  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light custom-fixed--top">
      {/* <!-- Left navbar links --> */}

      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <Link to="/home" className="nav-link">Inicio</Link>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <Link to="#" className="nav-link">Acerca de</Link>
        </li>
      </ul>

      {/* <!-- Right navbar links --> */}
      <ul className="navbar-nav ml-auto">

        {/* <!-- Navbar Search --> */}
        <li className="nav-item">
          <a className="nav-link" data-widget="navbar-search" href="#" role="button">
            {user.Area.area_name}
          </a>
        </li>

        {/* <!-- Notifications Dropdown Menu --> */}
        <li className="dropdown-center nav-item d-flex align-items-center">
          <button className="btn border-0 nav-link" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i className="bi bi-person-circle"></i>
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <button className="dropdown-item" onClick={() => {
                functionx();
              }}>
                <i className="bi bi-person-fill me-2"></i>
                Ver perfil
              </button>
            </li>
            <li>
              <button className="dropdown-item" onClick={() => {
                signOut();
              }}>
                <i className="bi bi-box-arrow-left me-2"></i>
                cerrar sesión
              </button>
            </li>
          </ul>
        </li>

        <li className="nav-item">
          <a className="nav-link" data-widget="fullscreen" href="#" role="button">
            <i className="fas fa-expand-arrows-alt"></i>
          </a>
        </li>
      </ul>

    </nav>
  );
}
export default MainNav;
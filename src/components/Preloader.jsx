import { useEffect } from 'react';
import logo from '../assets/media/img/AdminLTELogo.png'
import '../stylesheets/Preloader.css'

function Preloader() {

    return (

        <div className="preloader flex-column justify-content-center align-items-center">
            <img className="animation__shake" src={logo} alt="AdminLTELogo" height="60" width="60" />
        </div>

    );
}
export default Preloader;
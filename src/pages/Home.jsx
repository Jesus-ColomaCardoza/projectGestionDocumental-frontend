import Preloader from "../components/Preloader";
import MainNav from "../components/MainNav";
import MainAside from "../components/MainAside";
import { Outlet } from 'react-router-dom'


import "../templates/AdminLTE-3.2.0/plugins/jquery/jquery.min.js"
import "../templates/AdminLTE-3.2.0/plugins/bootstrap/js/bootstrap.bundle.min.js"
import "../templates/AdminLTE-3.2.0/dist/js/adminlte.min.js" //this controlo to preloader
import "../templates/AdminLTE-3.2.0/dist/css/adminlte.min.css"

function Home() {

  // To write the logic to load the 5 options of admin or 1 option of normal user
  return (
    <>
        <Preloader />
        <MainNav />
        <MainAside />
        <div className="content-wrapper">
          <Outlet />
        </div>
    </>
  );
}
export default Home;
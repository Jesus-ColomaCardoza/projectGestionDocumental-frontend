import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Header from "./modules/core/components/Header";
import SideNav from "./modules/core/components/SideNav";
import Home from "./modules/core/components/Home";
import Footer from "./modules/core/components/Footer";
import AllRoutes from "./modules/core/components/AllRoutes";
import './App.css'

function App() {

  return (
    <>
        <AllRoutes />
    </>
  );
}

export default App;

import React from "react";
import Header from "./Header";
import SideNav from "./SideNav";
import Home from "./Home";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <div className="wrapper">
        <Header />
        <SideNav />
        <div className="content-wrapper">
          <Outlet />
        </div>
        {/* <Home /> */}
        <Footer />
      </div>
    </>
  );
};

export default Dashboard;

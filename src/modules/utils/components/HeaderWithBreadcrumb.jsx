import React from "react";
import { Link } from "react-router-dom";

const HeaderWithBreadcrumb = ({title,breadcrumb}) => {
  return (
    <>
      {/* Content Header (Page header) */}
      <section className="content-header p-1">
        <div className="container-fluid">
          <div className="row d-flex">
            <div className="col-sm-6">
              <h1>{title}</h1>
              <div className="card flex flex-wrap justify-content-center gap-3"></div>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">{breadcrumb}</li>
              </ol>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
    </>
  );
};

export default HeaderWithBreadcrumb;

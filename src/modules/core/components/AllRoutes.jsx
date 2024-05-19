import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Area from "../../area/components/Area";
import Employee from "../../employee/components/Employee";

const AllRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/dashboard" element={<Dashboard/>}>
          <Route exact path="employees" element={<Employee/>}></Route>
          <Route exact path="areas" element={<Area/>}></Route>

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AllRoutes;

import React, { useState, useEffect } from "react";

const FormAreaUpdate = ({
  id,
  textButton1,
  textButton2,
  typeButton1,
  typeButton2,
  handleButton2,
  getArea,
  updateArea,
  dataUpdate,
  setDataUpdate,
}) => {
  const handleChange = (e) => {
    setDataUpdate({ ...dataUpdate, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    id != null ? getArea(id) : false;
  }, [id]);

  return (
    <>
      <form
        className="row g-3"
        onSubmit={(e) => {
          e.preventDefault();
          updateArea(id);
          e.target.reset();
          handleButton2();
        }}
      >
        <div className="col-md-12">
          <label htmlFor="inputAreaName" className="form-label">
            Área
          </label>
          <input
            type="text"
            className="form-control"
            name="area_name"
            onChange={handleChange}
            value={dataUpdate.area_name}
          />
        </div>
        <div className="col-md-12">
          <label className="form-label">Estatus</label>
          <select
            className="form-select"
            name="state"
            onChange={handleChange}
            value={dataUpdate.state}
          >
            <option disabled key={-1}>
              Seleccionar estado
            </option>
            <option key={0} value={"activo"}>
              activo
            </option>
            <option key={1} value={"inactivo"}>
              inactivo
            </option>
          </select>
        </div>
        <div className="col-12 d-flex justify-content-end">
          <button type="submit" className={`btn btn-${typeButton1} ms-1`}>
            {textButton1}
          </button>
          <button
            type="button"
            className={`btn btn-${typeButton2} ms-1`}
            onClick={handleButton2}
          >
            {textButton2}
          </button>
        </div>
      </form>
    </>
  );
};

export default FormAreaUpdate;

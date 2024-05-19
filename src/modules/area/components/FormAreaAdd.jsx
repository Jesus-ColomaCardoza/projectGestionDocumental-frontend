import React, { useState } from "react";

const FormAreaAdd = ({
  textButton1,
  textButton2,
  typeButton1,
  typeButton2,
  handleButton2,
  addArea,
  dataAdd,
  setDataAdd,
}) => {
  const handleChange = (e) => {
    setDataAdd({ ...dataAdd, [e.target.name]: e.target.value });
    // console.log(dataAdd);
  };

  return (
    <>
      <form
        className="row g-3"
        onSubmit={(e) => {
          e.preventDefault();
          addArea();
          e.target.reset();
          handleButton2();
        }}
      >
        <div className="col-md-12">
          <label htmlFor="inputAreaName" className="form-label">
            Área
          </label>
          <input
            required
            type="text"
            className="form-control"
            name="area_name"
            onChange={handleChange}
          />
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

export default FormAreaAdd;

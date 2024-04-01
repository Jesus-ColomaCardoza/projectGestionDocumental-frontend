import { useEffect, useState } from 'react';

import '../templates/AdminLTE-3.2.0/plugins/select2/css/select2.min.css'
import '../templates/AdminLTE-3.2.0/plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css'
import '../templates/AdminLTE-3.2.0/plugins/select2/js/select2.full.min.js'

export const Select2 = ({
  label,
  inputName,
  handleChange,
  data,
  attribute
}) => {

  const loadSelect2 = () => {
    //Initialize Select2 Elements
    $('.select2bs4').select2({
      theme: 'bootstrap4'
    })
  }

  useEffect(() => { loadSelect2() }, []);

  return (
    <>
      <label className="form-label">{label}</label>
      <select class="select2bs4 form-select " name={inputName} onChange={handleChange} defaultValue={-1}>
        <option disabled key={-1} value={-1}></option>
        {
          data.map((option) => {
            return <option key={option.id} value={option.id} >{option[attribute]}</option>
          })
        }
      </select>
    </>
  )
}

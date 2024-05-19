import React from 'react'

const SelectQuantityPages = ({setDataQuantity,setCurrentPage}) => {

  const handleDataQuantity = (e) => {
    setDataQuantity(parseInt(e.target.value));
    // For Each times selected of quantity pages , It start from the first page
    setCurrentPage(1); 
  }
  return (
    <div className='d-flex justify-content-center align-items-center'>
      <p className='m-0 px-1 fw-bold'>Mostrar</p>
      <select
        name="quantityPages"
        className='form-select fw-bold'
        onChange={handleDataQuantity}>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>
      <p className='m-0 px-1 fw-bold'>registros</p>
    </div>
  )
}

export default SelectQuantityPages
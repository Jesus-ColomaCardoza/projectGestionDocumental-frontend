import { useState } from "react";

export const usePagination = ( data ) => {
  const [dataQuantity, setDataQuantity] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);

  const indexFinal = currentPage * dataQuantity;
  const indexInitial = indexFinal - dataQuantity;
  const nData = data.slice(indexInitial, indexFinal);
  const nPages = Math.ceil(data.length / dataQuantity);

  return {
    indexInitial,
    indexFinal,
    nData,
    nPages,
    dataQuantity,
    setDataQuantity,
    currentPage,
    setCurrentPage,
  };
};

import React from "react";

const Filter = ({handleFilter,selectedOption}) => {
  return (
    <>
      <select defaultValue={selectedOption} onChange={(e)=>handleFilter(e.target.value)} className="bg-black px-2 py-1 rounded-xl input_Option appearance-none ml-4 text-sm font-medium">
        <option value="" className="text-center">Sắp xếp</option>
        <option value="Xem nhiều" className="text-center">Xem Nhiều</option>
        <option value="Mới nhất" className="text-center">Mới Nhất</option>
      </select>
    </>
  );
};

export default Filter;

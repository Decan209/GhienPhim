import React from "react";

const Filter = () => {
  return (
    <>
      <select className="bg-black px-4 py-1 rounded-xl input_Option appearance-none ml-4 text-sm font-medium hover:text-orange-500">
        <option value="">--Sắp xếp--</option>
        <option value="Xem Nhiều">Xem Nhiều</option>
        <option value="Mới Nhất">Mới Nhất</option>
      </select>
    </>
  );
};

export default Filter;

import { useRouter } from "next/router";
import React, { useState } from "react";

export default function SearchBox() {
  const router = useRouter();
  const [valueInput, setValueInput] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    router.push({
      pathname: "/categories/searchTable",
      query: { q:valueInput},
    });
  };
  return (
    <form onSubmit={handleOnSubmit} className="my-auto max-lg:w-1/2">
      <input
        onChange={(e) => setValueInput(e.target.value)}
        type="text"
        placeholder="Search..."
        className="text-orange-500 max-md:w-11/12 max-lg:w-11/12 border-none py-2 px-4 w-96 rounded-3xl bg-gray-700"
      />
      <button className=" max-sm:hidden  max-md:hidden max-lg:hidden text-orange-500 bg-black relative right-28 px-4 py-1 rounded-3xl">
        Tìm kiếm
      </button>
      {/* <div className="absolute bg-black ml-3 mt-1 rounded-lg max-sm:w-full max-sm:left-0 hidden">
          {FaturedMovies.map((data) => (
            <div className="flex my-2 px-2 " key={data.id}>
              <img src={data.img} alt="" className="w-14 h-14" />
              <div className="ml-2">
                <div className="text-sm font-semibold font-serif text-center mt-2 px-2">
                  {data.name}
                </div>
                <div className="text-center font-medium text-gray-300 font-serif">
                  {data.nameEng}
                </div>
              </div>
            </div>
          ))}
        </div> */}
    </form>
  );
}

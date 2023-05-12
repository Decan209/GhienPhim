import React, { useState } from "react";
import {FaturedMovies} from '../../../data/FaturedMovies'
import { AiFillForward, AiOutlineBackward } from "react-icons/ai";
import MainLayout from "@/pages/layout/MainLayout";

export default function index() {
    const [nextPage, setNextPage] = useState(1)
  return (
    <MainLayout>
      <div className="text-2xl font-semibold pl-4 mt-8 ml-4 font-seri text-center py-4">
        Danh Sách Phim Yêu Thích
      </div>
      <div className="w-3/5 mx-auto max-sm:w-full max-md:w-3/4 max-lg:w-3/4">
        {FaturedMovies.map((data) => (
          <div
            className="flex justify-between px-2 my-2 bg-black"
            key={data.id}
          >
            <img src={data.img} alt="" className="w-24 h-24" />
            <div className="ml-2 my-auto">
              <div className="text-sm font-semibold font-serif text-center mt-2 px-2">
                {data.name}
              </div>
              <div className="text-center font-medium text-gray-300 font-serif">
                {data.nameEng}
              </div>
            </div>
            <button className="w-20 h-20 bg-red-800 text-xs font-semibold p-1 my-auto">
              Xóa Khỏi Danh Sách Yêu Thích
            </button>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center">
        <div className="inline-flex mt-2 xs:mt-0">
          <button
            onClick={(e) => setNextPage(nextPage - 1)}
            className={`inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-l hover:bg-orange-600 ${
              nextPage <= 1 ? "hidden" : ""
            }`}
          >
            <AiOutlineBackward />
          </button>
          <button
            onClick={(e) => setNextPage(nextPage + 1)}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-600 border-0 border-l border-gray-700 rounded-r hover:bg-orange-600"
          >
            <AiFillForward />
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

import React, { useEffect, useState } from "react";
import { AiOutlineBackward, AiFillForward } from "react-icons/ai";
import Filter from "../Filter/Filter";
import ProductList from "../ProductList/ProductList";
import { useQuery } from "react-query";
import { BeatLoader } from "react-spinners";

const ProductPage = ({ getApi,category }) => {
  const [nextPage, setNextPage] = useState(1);

  useEffect(() => {
    if (nextPage !== null) {
      refetch();
    }
  }, [nextPage]);

  const { isLoading, error, data, refetch } = useQuery(
    ["actionMovie", nextPage],
    () => getApi(nextPage)
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <BeatLoader color="hsla(33, 100%, 50%, 1)" margin={3} size={20} />
      </div>
    );
  }

  if (error) {
    return console.log(error);
  }
  return (
    <>
      <div className="text-2xl font-semibold pl-4 mt-8 ml-4 font-seri text-center py-4">
        {category}
      </div>
      <div className="w-3/4 mx-auto mt-4">
        <div className="py-4">
          <Filter />
        </div>
        <ProductList data={data} />
      </div>
      <div className="flex flex-col items-center py-4">
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
            className={`inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-600 border-0 border-l border-gray-700 rounded-r hover:bg-orange-600
             ${data.length<8?"hidden":""}`}
          >
            <AiFillForward />
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductPage;

import MainLayout from "@/pages/layout/MainLayout";
import { getSearch } from "@/services/search.service";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useQuery } from "react-query";
import { BeatLoader } from "react-spinners";

const SearchTable = () => {
  const [valueSearch, setValueSearch] = useState("");
  const router = useRouter();

  const query = router.query.q;

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push({
      pathname: "/categories/searchTable",
      query: { q: valueSearch },
    });
  };

  const { isLoading, error, data } = useQuery(["searchValue", query], () =>
    getSearch(query)
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
    <MainLayout>
      <div className="w-1/2 mx-auto mt-4 max-sm:w-full">
        <div className="flex">
          <span className="font-bold text-2xl text-orange-500 pr-1">|</span>
          <div className="font-semibold text-xl mt-1">
            Kết quả tìm kiếm : {query}
          </div>
        </div>
        <form onSubmit={handleSubmit} className="py-4 flex relative">
          <input
            className="w-full p-2 rounded-lg bg-gray-700 text-orange-500"
            type="text"
            defaultValue={query}
            onChange={(e) => setValueSearch(e.target.value)}
          />
          <button type="submit" className="absolute right-3 top-7">
            <FaSearch className="text-orange-500" />
          </button>
        </form>
        <div className="max-sm:w-full max-md:w-3/4 max-lg:w-3/4">
          {data == 0 ? (
            <div className="font-semibold text-xl my-4 text-center">Không tìm thấy kết quả</div>
          ) : (
            <div>
              {data.map((data) => (
                <Link
                  href={`/details`}
                  as={`/details/${data.slug}`}
                  className="flex px-2 my-2 bg-black"
                  key={data._id}
                >
                  <img src={data.avatar} alt="" className="w-24 h-24" />
                  <div className="ml-2 my-auto">
                    <div className="text-xl font-semibold font-mono mt-2 px-2">
                      {data.name}
                    </div>
                    <div className=" font-medium text-gray-300 font-serif px-2">
                      {data.englishName}
                    </div>
                    <div className="text-sm font-medium font-mono mt-2 px-2">
                      Đạo diễn : {data.director}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default SearchTable;

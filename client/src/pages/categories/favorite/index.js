import React, { useEffect, useState } from "react";
import { AiFillForward, AiOutlineBackward } from "react-icons/ai";
import MainLayout from "@/pages/layout/MainLayout";
import { useSession } from "next-auth/react";
import {
  deleteFavouriteMovie,
  getFavouriteMovie,
} from "@/services/favorite.service";
import Link from "next/link";
import { BeatLoader } from "react-spinners";
import { useQuery } from "react-query";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";

export default function Favorite() {
  const { data: session } = useSession();
  const email = session?.user?.email;
  // const [clicked, setClicked] = useState(false);

  const handleDelete = (idMovie) => {
    deleteFavouriteMovie({ email, idMovie })
      .then((res) => {
        if (res.data.status === "ok") {
          toast.success(res.data.message);
          refetch();
        }
      })
      .catch((error) => console.log(error));
  };

  const { isLoading, error, data, refetch } = useQuery(
    ["getFavourite", email ? email : undefined],
    () => getFavouriteMovie(email ? email : undefined)
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
      <ToastContainer />
      <div className="text-2xl font-semibold pl-4 mt-8 ml-4 font-seri text-center py-4">
        Danh Sách Phim Yêu Thích Của : {data?.name}
      </div>
      {data?.favouriteMovie?.length === 0 ? (
        <div className="text-2xl font-semibold text-center my-24">
          Không có phim yêu thích nào
        </div>
      ) : (
        <div></div>
      )}
      <div className="w-3/5 mx-auto max-sm:w-full max-md:w-3/4 max-lg:w-3/4">
        {data?.favouriteMovie?.map((data) => (
          <div
            className="flex justify-between px-2 my-2 bg-black"
            key={data._id}
          >
            <Link
              href={`/details`}
              as={`/details/${data.slug}`}
              className="flex justify-start"
            >
              <Image
                width={100}
                height={100}
                src={data.avatar}
                alt=""
                className="w-24 h-24"
              />
              <div className="px-8 my-auto">
                <div className="text-sm font-semibold font-mono mt-2">
                  {data.name}
                </div>
                <div className="font-medium text-gray-300 font-serif">
                  {data.englishName}
                </div>
                <div className={`font-mono text-sm`}>Lượt xem: {data.view}</div>
              </div>
            </Link>
            <button
              onClick={() => handleDelete(data._id)}
              className="w-20 h-20 bg-red-800 text-xs font-semibold p-1 my-auto"
            >
              Xóa Khỏi Danh Sách Yêu Thích
            </button>
          </div>
        ))}
      </div>
      {/* <div className="flex flex-col items-center">
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
      </div> */}
    </MainLayout>
  );
}

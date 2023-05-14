import Image from "next/image";
import Link from "next/link";
import React from "react";

const SideBarList = ({ data }) => {
  return (
    <>
      <div>
        {data?.map((data, index) => (
          <Link
            href={`/details`}
            as={`/details/${data.slug}`}
            className={`flex my-2 cursor-pointer ${
              index % 2 === 0 ? "bg-gray-800" : ""
            }`}
            key={index}
          >
            <img
              src={data.avatar}
              alt=""
              className="w-14 h-14 my-auto"
            />
            <div className="ml-2">
              <div className="text-sm font-semibold font-mono mt-2 text-start">
                {data.name}
              </div>
              <div className="text-start font-medium text-gray-300 font-serif text-xs">
                {data.englishName}
              </div>
              <div className={`font-mono text-sm ${data.view ? "" : "hidden"}`}>
                Lượt xem: {data.view}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default SideBarList;

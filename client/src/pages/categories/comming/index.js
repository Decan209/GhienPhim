import Link from "next/link";
import React from "react";

const index = () => {
  return (
    <>
      <div className=" flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="text-2xl font-semibold mb-4">
            Chúng tôi sẽ cập nhật phim sớm nhất
          </div>
          <Link
            href={"/"}
            className="bg-orange-500 p-2 font-semibold rounded-lg"
          >
            Trở lại
          </Link>
        </div>
      </div>
    </>
  );
};

export default index;

import React from "react";
import YouTube from "react-youtube";
import MainLayout from "../layout/MainLayout";
import { AiFillEye } from "react-icons/ai";

const Watching = () => {
  const opts = {
    height: "390",
    width: "680",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  return (
    <MainLayout>
      <div className="p-4 w-3/4 mx-auto">
        <div className="flex justify-between w-3/4">
          <div className="py-4">
            <div className="text-2xl font-bold font-mono">Tiếng Thét 6</div>
            <div className="text-lg text-gray-500 font-bold font-serif">
              Scream Vi
            </div>
          </div>
          <div className="flex justify-center items-center mr-2">
            <AiFillEye className="text-orange-500 text-xl" />
            <p className="text-sm font-medium text-gray-500 pl-1">400</p>
          </div>
        </div>
        <YouTube videoId="wzvnp3SLufs" opts={opts} />
        <div className="font-medium text-xl py-4 mt-4">
          <span className="text-orange-500">/</span> Nội dung phim
        </div>
        <div>
          Bộ phim tiếp tục câu chuyện về cậu thiếu niên Billy Batson, khi đọc
          thuộc lòng từ ma thuật "SHAZAM!" được biến thành Siêu anh hùng thay
          thế bản ngã trưởng thành của anh ấy, Shazam.
        </div>
        <div className="font-medium text-xl pty-4 mt-12">
          <span className="text-orange-500">/</span> Bình luận
        </div>
      </div>
    </MainLayout>
  );
};

export default Watching;

import MainLayout from "@/pages/layout/MainLayout";
import React from "react";
import { AiFillEye, AiFillHeart } from "react-icons/ai";
import YouTube from "react-youtube";
import Link from "next/link";
import { useRouter } from "next/router";
import { getOneMovie } from "@/services/Detail.service";
import { useQuery } from "react-query";
import { BeatLoader } from "react-spinners";
import { useSession } from "next-auth/react";
import { addFavorite } from "@/services/favorite.service";
import { ToastContainer, toast } from "react-toastify";

const opts = {
  height: "400",
  width: "100%",
  playerVars: {
    autoplay: 1,
  },
};

const Details = () => {
  const router = useRouter();
  const id = router.query.slug;
  const { data: session } = useSession();

  if (id === "undefined") {
    return (
      <div className=" flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="text-2xl font-semibold mb-4">Chúng tôi sẽ cập nhật phim sớm nhất</div>
          <Link href={"/"} className="bg-orange-500 p-2 font-semibold rounded-lg">Trở lại</Link>
        </div>
      </div>
    );
  }

  const { isLoading, error, data } = useQuery(["detailMovie", id], () =>
    getOneMovie(id)
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



  const email = session?.user?.email;

  const handleAddFeatue = (idMovie)=>{
    addFavorite({email,idMovie})
    .then((res) => {
      if (res.data.status === "ok") {
        toast.success("Thêm vào danh sách yêu thích thành công");
      }
    })
    .catch((err) => toast.error(err.response.data.message));
  }

  return (
    <MainLayout>
      {data?.map((todo) => (
        <div className="p-4 w-3/4 mx-auto max-sm:w-full" key={todo.id}>
          <div className="flex max-sm:block">
            <div className="w-2/4 p-2 max-sm:w-full">
              <img
                src={todo.avatar}
                alt="Picture of the author"
                className="w-10/12 h-96 max-sm:hidden rounded-lg"
              />
              <img
                src={`https://img.youtube.com/vi/${todo.videoId}/hqdefault.jpg`}
                alt="Picture of the author"
                className="w-full max-sm:h-52 max-sm:inline hidden rounded-lg"
              />
              <div className="flex justify-start p-2">
                <AiFillEye className="text-orange-500 text-xl" />
                <p className="text-sm font-medium text-gray-500 pl-1">
                  {todo.view}
                </p>
              </div>
            </div>
            <div>
              <div className="border-b-2 border-gray-600 p-4">
                <div className="text-2xl font-bold font-mono">{todo.name}</div>
                <div className="text-lg text-gray-500 font-bold font-serif">
                  {todo.englishName}
                </div>
              </div>
              <div className="p-4">
                <div className="font-semibold py-1">
                  Thời Lượng: {todo.long}
                </div>
                <div className="font-semibold py-1">
                  Năm Phát Hành: {todo.releaseAt}
                </div>
                <div className="font-semibold py-1">
                  Đạo Diễn: {todo.director}
                </div>
                <div className="font-semibold py-1">
                  Diễn Viên: {todo.performer}
                </div>
                <div className="font-semibold py-1">
                  Quốc Gia: {todo.country}
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 flex">
            <button className="border-2 px-4 py-2 rounded-3xl font-medium text-sm">
              Trailler
            </button>
            <Link
              href={"#section-1"}
              className="bg-orange-500 border-2 border-orange-500 px-4 py-2 rounded-3xl ml-3 font-medium text-sm"
            >
              Xem Phim
            </Link>
            <div onClick={()=>handleAddFeatue(todo._id)} className="px-4 py-1 ml-10">
              <Link href={session?.user?`/categories/favorite`:`/auth/Login`}>
                <AiFillHeart className="text-3xl text-gray-700"/>
              </Link>
            </div>
          </div>
          <div>
            <div className="py-8 w-10/12 max-sm:w-full">
              <YouTube id="section-1" videoId={todo.videoId} opts={opts} />
            </div>
            <div className="font-medium text-xl p-4 mt-4">
              <span className="text-orange-500">/</span> Nội dung phim
            </div>
            <div>{todo.description}</div>
          </div>
          <div className="font-medium text-xl p-4 mt-12">
            <span className="text-orange-500">/</span> Bình luận
          </div>
        </div>
      ))}
    </MainLayout>
  );
};

export default Details;

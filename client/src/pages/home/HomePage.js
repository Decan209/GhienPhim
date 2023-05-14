import { FaturedMovies } from "@/data/FaturedMovies";
import MainLayout from "../layout/MainLayout";
import Poster from "./components/Poster/Poster";
import SlickSlide from "./components/SlickSlide/SlickSlide";
import SideBarList from "./components/SideBarList/SideBarList";
import ProductList from "@/components/ProductList/ProductList";
import { ComingDb } from "@/data/ComingSoon";
import { useQueries } from "react-query";
import {
  hotMoviesService,
  newSingleMoiveService,
  trenddingMovie,
} from "@/services/Homepage.service";
import { BeatLoader } from "react-spinners";
import { getFilmViet } from "@/services/categories.service";
import Link from "next/link";
import { PosterImg } from "@/data/Posters";


export default function HomePage() {
  const queries = [
    { queryKey: "filmHot", queryFn: hotMoviesService },
    { queryKey: "newSingleFilm", queryFn: newSingleMoiveService },
    { queryKey: "FilmViet", queryFn: getFilmViet },
    { queryKey: "TrenddingMovie", queryFn: trenddingMovie },
  ];
  const results = useQueries(queries);

  if (results.some((result) => result.isLoading)) {
    return (
      <div className="flex justify-center items-center h-screen">
        <BeatLoader color="hsla(33, 100%, 50%, 1)" margin={3} size={20} />
      </div>
    );
  }

  if (results.some((result) => result.isError)) {
    return <div>Error!</div>;
  }

  const filmHot = results[0].data;
  const newSingleFilm = results[1].data;
  const filmViet = results[2].data;
  const TrenddingMovie = results[3].data;

  return (
    <MainLayout>
      <div>
        <Poster data={PosterImg}/>
        <div className="text-2xl font-semibold pl-8 mt-8 ml-9 font-momo">
          Phim Hot
        </div>
        <SlickSlide data={filmHot} />
        <div className="flex max-sm:block max-md:block max-lg:block">
          <div className="w-3/4 p-4 max-sm:w-full max-md:w-full max-lg:w-full mt-2">
            <div className="text-2xl font-semibold pl-4 mt-8 ml-4 font-mono mb-2">
              Phim Lẻ Mới Cập Nhật
            </div>
            <ProductList data={newSingleFilm} />
            <div className="text-2xl font-semibold pl-4 mt-8 ml-4 font-mono">
              <Link href={"/categories/filmViet"}>Phim Việt</Link>
            </div>
            <ProductList data={filmViet} />
          </div>
          <div>
            <div className="max-sm:hidden max-md:hidden max-lg:hidden p-2 w-11/12">
              <div className="text-2xl font-semibold p-4 mt-8 font-mono ">
                Phim Sắp Ra Mắt
              </div>
              <SideBarList data={ComingDb} />
            </div>
            <div className="max-sm:px-2 max-md:px-3 max-lg:p-3">
              <div className="text-2xl font-semibold p-4 mt-8 font-mono">
                TRENNDING
              </div>
              <SideBarList data={TrenddingMovie} />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

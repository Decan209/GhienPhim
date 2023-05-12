import ProductPage from "@/components/ProductPage/ProductPage";
import { FaturedMovies } from "@/data/FaturedMovies";
import MainLayout from "@/pages/layout/MainLayout";
import { getFilmViet } from "@/services/categories.service";
import React from "react";

export default function index() {
  return (
    <MainLayout>
      <ProductPage getApi={getFilmViet} category={"Phim Việt"} />
    </MainLayout>
  );
}

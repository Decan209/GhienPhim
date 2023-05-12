import ProductPage from "@/components/ProductPage/ProductPage";
import MainLayout from "@/pages/layout/MainLayout";
import { getFilmViet, getSingleMovie } from "@/services/categories.service";
import React from "react";

export default function index() {
  return (
    <MainLayout>
      <ProductPage getApi={getSingleMovie} category={"Phim Lẻ"} />
    </MainLayout>
  );
}
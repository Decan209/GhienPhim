import ProductPage from "@/components/ProductPage/ProductPage";
import MainLayout from "@/pages/layout/MainLayout";
import { getComedyMovie } from "@/services/categories.service";
import React from "react";

export default function index() {
  return (
    <MainLayout>
      <ProductPage getApi={getComedyMovie} category={"Phim Hài"} />
    </MainLayout>
  );
}

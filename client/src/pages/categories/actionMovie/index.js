import ProductPage from "@/components/ProductPage/ProductPage";
import MainLayout from "@/pages/layout/MainLayout";
import { getActionMovie } from "@/services/categories.service";
import React from "react";

export default function index() {
  return (
    <MainLayout>
      <ProductPage getApi={getActionMovie} category={"Phim Hành động"} />
    </MainLayout>
  );
}

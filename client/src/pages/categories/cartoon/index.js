import React from 'react';
import {FaturedMovies} from '../../../data/FaturedMovies'
import MainLayout from '@/pages/layout/MainLayout';
import ProductPage from '@/components/ProductPage/ProductPage';
import { getCartonMovie } from '@/services/categories.service';

export default function index() {
  return (
    <MainLayout>
      <ProductPage getApi={getCartonMovie} category={"Phim Hoạt Hình"} />
    </MainLayout>
  )
}

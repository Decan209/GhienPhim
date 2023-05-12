import React from 'react';
import {FaturedMovies} from '../../../data/FaturedMovies'
import MainLayout from '@/pages/layout/MainLayout';
import ProductPage from '@/components/ProductPage/ProductPage';

export default function index() {
  return (
    <MainLayout>
        <ProductPage data={FaturedMovies}/>
    </MainLayout>
  )
}
'use client';
import React, { useState } from 'react';
import SortCategory from '@/app/_component/homepage/sort-category';
export default function Home() {

  return (
    <div className='flex-1 max-w-screen-xl mx-auto '>
      <div className=" h-48 border rounded-md bg-cover bg-center bg-[url('/assets/images/wallpaper.jpg')] " />
      <SortCategory />
    </div>
  );
}



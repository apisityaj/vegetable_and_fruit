'use client';
import React, { useState } from 'react';
import SortCategory from '@/app/_component/homepage/sort-category';

export default function Home() {

  /*
  Assignment

  1. Have a list of clickable buttons.
  2. Each button will be moved into its own column separated by type.
  3. Once moved, each button will have 5 seconds on the screen and then will be moved back to the bottom of the main list.
  4. If click on the right column(Fruit / Vegetable) the item must go back to the bottom of the left column(list) immediately.
  */

  return (
    <div>
      <div className="border rounded-md bg-cover bg-center bg-[url('/assets/images/wallpaper.jpg')]  h-48"/>
      <SortCategory />
    </div>
  );
}



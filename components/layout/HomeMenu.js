'use client';

import MenuItem from '../menu/MenuItem';
import SectionHeaders from './SectionHeaders';
import { CldImage } from 'next-cloudinary';
import React, { useEffect, useState } from 'react';
export default function HomeMenu() {
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    fetchAllMenuItems();
  }, []);

  const fetchAllMenuItems = async () => {
    fetch('/api/menuItems').then((res) =>
      res.json().then((res) => {
        // console.log(res);
        setBestSellers(res.slice(-3));
      })
    );
  };
  return (
    <section>
      <div className="flex justify-between relative h-full">
        <div className="h-48 -z-10 absolute -top-20 left-0 ">
          <CldImage
            src={'/fvtvcuexkkejfdxqaxia.png'}
            width={109}
            height={189}
            alt="sallad"
            sizes="100vw"
          ></CldImage>
        </div>
        <div className="h-48 w-auto -z-10 right-0 absolute -top-24">
          <CldImage
            src={'lnrudizuzgem2px0wo9k.png'}
            width={100}
            height={100}
            sizes="100vw"
            alt="sallad"
          ></CldImage>
        </div>
      </div>
      <div className="text-center">
        <SectionHeaders
          subHeader={'Check Out'}
          mainHeader={'Our Best Sellers'}
        />
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4 bg-orange-100/40 p-4">
        {bestSellers?.map((item, index) => (
          <MenuItem
            key={index}
            image={item.image}
            itemName={item.itemName}
            description={item.description}
            basePrice={item.basePrice}
          />
        ))}
      </div>
    </section>
  );
}

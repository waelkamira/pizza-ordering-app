'use client';

import MenuItem from '../menu/MenuItem';
import SectionHeaders from './SectionHeaders';
import { CldImage } from 'next-cloudinary';
import React, { useEffect, useState } from 'react';
export default function HomeMenu() {
  const [bestSellers, setBestSellers] = useState([]);
  const [message, setMessage] = useState(false);
  useEffect(() => {
    fetchAllMenuItems();
  }, []);

  const fetchAllMenuItems = async () => {
    fetch('/api/menuItems').then((res) =>
      res.json().then((res) => {
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
            alt="salad"
            sizes="100vw"
          ></CldImage>
        </div>
        <div className="h-48 w-auto -z-10 right-0 absolute -top-24">
          <CldImage
            src={'lnrudizuzgem2px0wo9k.png'}
            width={100}
            height={100}
            sizes="100vw"
            alt="salad"
          ></CldImage>
        </div>
      </div>
      <div className="text-center">
        <SectionHeaders
          subHeader={'Check Out'}
          mainHeader={'Our Best Sellers'}
        />
      </div>
      {message && (
        <div className="fixed flex items-center justify-center bg-black/30 inset-0 h-screen w-screen text-center rounded-lg p-8">
          <div className=" bg-secondary p-8 rounded-lg">
            <h1 className="text-white  text-2xl">
              You Have To Login First To Make An Order
            </h1>
          </div>
        </div>
      )}
      <div
        className={
          'flex flex-col xs:grid xs:grid-cols-2 sm:grid sm:grid-cols-3 sm:p-4 gap-4 mt-4 bg-orange-100/40 p-8'
        }
      >
        {bestSellers?.map((item, index) => (
          <MenuItem
            key={item._id}
            menuItem={{ ...item }}
            onSetMessage={setMessage}
          />
        ))}
      </div>
    </section>
  );
}

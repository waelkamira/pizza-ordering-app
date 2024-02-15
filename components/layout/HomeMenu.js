'use client';
import Image from 'next/image';
import React from 'react';
import MenuItem from '../menu/MenuItem';
import SectionHeaders from './SectionHeaders';
import { CldImage } from 'next-cloudinary';

export default function HomeMenu() {
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
        <SectionHeaders subHeader={'Check Out'} mainHeader={'Menu'} />
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4 bg-orange-100/40 p-4">
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
      </div>
    </section>
  );
}

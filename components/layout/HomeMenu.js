import Image from 'next/image';
import React from 'react';
import MenuItem from '../menu/MenuItem';
import SectionHeaders from './SectionHeaders';

export default function HomeMenu() {
  return (
    <section>
      <div className="flex justify-between relative h-full">
        <div className="h-48 -z-10 absolute -top-20 left-0 ">
          <Image
            src={'/sallad1.png'}
            width={109}
            height={189}
            alt="sallad"
          ></Image>
        </div>
        <div className="h-48 -z-10 right-0 absolute -top-24">
          <Image
            src={'/sallad2.png'}
            width={100}
            height={100}
            alt="sallad"
            className="bg-green-600 "
          ></Image>
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

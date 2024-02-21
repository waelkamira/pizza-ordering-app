import React from 'react';
import { CldImage } from 'next-cloudinary';
export default function MenuItem({ image, itemName, description, basePrice }) {
  return (
    <div className="bg-gray-600 p-4 rounded-lg text-center hover:bg-white transition-all hover:shadow-xl text-white hover:text-black hover:font-semibold">
      <div className="text-center">
        <CldImage
          src={image}
          alt="pizza"
          width={150}
          height={200}
          sizes="100vw"
          className="max-h-auto block mx-auto max-h-24"
        />
      </div>
      <h1 className="font-semibold my-3 text-xl ">{itemName}</h1>
      <p className=" text-sm line-clamp-3 ">{description}</p>
      <button className="bg-primary rounded-full text-white x-4 py-2 px-4 mt-4 ">
        {basePrice} $
      </button>
    </div>
  );
}

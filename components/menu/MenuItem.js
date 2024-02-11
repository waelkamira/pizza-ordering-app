import React from 'react';

export default function MenuItem() {
  return (
    <div className="bg-gray-600/40 p-4 rounded-lg text-center hover:bg-white transition-all hover:shadow-xl">
      <div className="text-center">
        <img
          src="/pizza.png"
          alt="pizza"
          className="max-h-auto block mx-auto max-h-24"
        />
      </div>
      <h1 className="font-semibold my-3 text-xl">Pipporoni Pizza</h1>
      <p className="text-gray-500 text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit .
      </p>
      <button className="bg-primary rounded-full text-white x-4 py-2 px-4 mt-4">
        Add To Cart 12$
      </button>
    </div>
  );
}

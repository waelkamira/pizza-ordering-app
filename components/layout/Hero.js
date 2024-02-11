import Image from 'next/image';
import React from 'react';
import Right from '../icons/Right';

export default function Hero() {
  return (
    <section className="hero mt-4">
      <div className="py-12">
        <h1 className="text-4xl font-semibold leading-12">
          Everything <br />
          Is Better <br /> With a &nbsp;
          <span className="text-primary">Pizza</span>
        </h1>
        <p className="mt-6 text-gray-500 text-sm">
          Pizza is the missing piece that makes every day complete a simple yet
          delicious joy in life
        </p>
        <div className="flex gap-4 my-2 text-sm">
          <button className="flex items-center justify-center bg-primary gap-2 text-white px-4 py-2 rounded-full">
            ORDER NOW
            <Right />
          </button>
          <button className="flex items-center border-none gap-2 py-2 px-4 text-gray-600 font-semibold">
            Learn More <Right />
          </button>
        </div>
      </div>
      <div className="relative h-96 w-auto">
        <Image
          src={'/pizza.png'}
          alt="pizza"
          layout="fill"
          objectFit="contain"
          priority
          sizes="auto"
        />
      </div>
    </section>
  );
}
import React, { useContext, useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { CartContext } from '../ContextProvider';

export default function Prices({ cartProducts }) {
  const { total, finalPrice } = useContext(CartContext);
  // console.log('cartProducts from prices', cartProducts);
  let subTotal = 0;
  if (cartProducts?.length > 0) {
    for (const product of cartProducts) {
      subTotal += finalPrice(product);
    }
  }

  return (
    <div className="p-4 flex flex-col  border border-secondary rounded-lg ">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-nowrap text-gray-500">SubTotal:</h1>
        <IoIosArrowForward />
        <IoIosArrowForward />
        <IoIosArrowForward />
        <IoIosArrowForward />
        <IoIosArrowForward />
        <h1 className="float-end mr-4 font-bold p-4 rounded-lg text-gray-500">
          💲
          {total || subTotal}
        </h1>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-nowrap text-gray-500">Delivery:</h1>
        <IoIosArrowForward />
        <IoIosArrowForward />
        <IoIosArrowForward />
        <IoIosArrowForward />
        <IoIosArrowForward />
        <h1 className="float-end mr-4 font-bold p-4 rounded-lg text-gray-500">
          💲5
        </h1>
      </div>
      <hr />
      <h1 className="text-center mt-4  font-bold">
        Total: 💲{total || subTotal + 5}
      </h1>
    </div>
  );
}

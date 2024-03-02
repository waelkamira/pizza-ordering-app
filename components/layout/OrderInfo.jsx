import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../components/ContextProvider';
import { CldImage } from 'next-cloudinary';
export default function OrderInfo({ product }) {
  const { cartProducts, removeCartProduct, finalPrice, total } =
    useContext(CartContext);
  return (
    <div className="flex items-center gap-4 rounded-lg grow">
      <CldImage
        src={product?.image}
        width={100}
        height={100}
        sizes="100vb"
        alt="product image"
      />
      {product?.size?.length > 0 || product?.extras?.length > 0 ? (
        <div className="grow">
          <h1 className="text-nowrap font-bold mb-2">{product?.itemName}</h1>
          <div>
            <h1>Size: {product?.size?.name}</h1>
          </div>
          <div>
            <hr />

            <div>
              {product?.extras.map((item) => {
                return (
                  <div key={item._id}>
                    <h1 className="mt-2">
                      Extra {item.name}:
                      <span className="ml-2 ">${item.price}</span>
                    </h1>
                    <hr />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="grow">
          <h1 className="font-bold text-wrap">{product?.itemName}</h1>
        </div>
      )}
      <h1 className="text-lg font-semibold">${finalPrice(product)}</h1>
    </div>
  );
}

'use client';
import React, { useContext, useState } from 'react';
import SectionHeaders from '../../components/layout/SectionHeaders';
import { CartContext } from '../../components/ContextProvider';
import { CldImage } from 'next-cloudinary';
import { FaRegTrashCan } from 'react-icons/fa6';
import { IoIosArrowForward } from 'react-icons/io';
import UseProfile from '../../components/UseProfile';

export default function CartPage() {
  const { data } = UseProfile();

  console.log(data);
  const {
    cartProducts,
    setCartProducts,
    clearCart,
    removeCartProduct,
    finalPrice,
    total,
  } = useContext(CartContext);
  console.log(cartProducts);

  return (
    <section className="mt-8 mx-auto">
      <div className=" text-center mb-4">
        <SectionHeaders mainHeader={'Cart'} />
      </div>

      <div className="grid grid-cols-2 gap-8 mt-8">
        <div className="">
          <div className="p-4 flex justify-between items-center border border-secondary rounded-lg ">
            <h1 className="font-semibold text-nowrap">Total:</h1>
            <IoIosArrowForward />
            <IoIosArrowForward />
            <IoIosArrowForward />
            <IoIosArrowForward />
            <IoIosArrowForward />
            <h1 className="float-end mr-4 font-bold p-4 rounded-lg">
              💲{total}
            </h1>
          </div>
          {cartProducts?.length === 0 && (
            <h1 className="text-center mt-4 font-bold">
              No Products In Your Cart
            </h1>
          )}
          {cartProducts?.length > 0 &&
            cartProducts?.map((product, index) => {
              return (
                <div>
                  <div className="flex items-center gap-4 border border-primary my-2 rounded-lg p-4 h-44">
                    <CldImage
                      src={product?.image}
                      width={100}
                      height={100}
                      sizes="100vb"
                      alt="product image"
                    />
                    {product?.size?.length > 0 ||
                    product?.extras?.length > 0 ? (
                      <div className="grow">
                        <h1 className="text-nowrap font-bold mb-2">
                          {product?.itemName}
                        </h1>
                        <div>
                          <h1>Size: {product?.size?.name}</h1>
                        </div>
                        <div>
                          <hr />

                          <div>
                            {product?.extras.map((item) => {
                              return (
                                <div>
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
                        <h1 className="font-bold ">{product?.itemName}</h1>
                      </div>
                    )}
                    <h1 className="text-lg font-semibold">
                      {' '}
                      ${finalPrice(product)}
                    </h1>
                    <FaRegTrashCan
                      className="cursor-pointer hover:text-primary "
                      type="button"
                      onClick={() => {
                        removeCartProduct(index);
                        location.reload();
                      }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
        <div className="bg-secondary  rounded-lg p-4 h-fit">
          <h1 className="text-white">Checkout:</h1>
          <div>
            <label className="text-white">Phon Number</label>
            <input
              type="text"
              placeholder="Phon Number"
              value={data.phoneNumber}
            />
          </div>
          <div>
            <label className="text-white">Street Address</label>
            <input
              type="text"
              placeholder="Street Address"
              value={data.streetAddress}
            />
          </div>
          <div className="flex gap-4">
            <div>
              <label className="text-white">Postal Code</label>
              <input
                type="text"
                placeholder="Postal Code"
                value={data.postalCod}
              />
            </div>
            <div>
              <label className="text-white">City</label>
              <input type="text" placeholder="City" value={data.city} />
            </div>
          </div>
          <div>
            <label className="text-white">Country</label>
            <input type="text" placeholder="Country" value={data.country} />
          </div>
          <div className="mt-4">
            <button className="hover:bg-primary/90 text-lg" type="submit">
              Pay $<span className="font-bold text-lg">{total}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

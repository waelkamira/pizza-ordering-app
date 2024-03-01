'use client';
import React, { useContext, useEffect, useState } from 'react';
import SectionHeaders from '../../components/layout/SectionHeaders';
import { CartContext } from '../../components/ContextProvider';
import { CldImage } from 'next-cloudinary';
import { FaRegTrashCan } from 'react-icons/fa6';
import UseProfile from '../../components/UseProfile';
import toast from 'react-hot-toast';
import OrderInfo from '../../components/layout/OrderInfo';
import Address from '../../components/layout/Address';
import Prices from '../../components/layout/Prices';

export default function CartPage() {
  const { data } = UseProfile();
  const { cartProducts, removeCartProduct, finalPrice, total } =
    useContext(CartContext);
  // console.log('cartProducts:', cartProducts);

  //? when payment failed
  useEffect(() => {
    if (typeof window?.console !== 'undefined') {
      if (window?.location?.href.includes('canceled=1')) {
        toast.error('Payment Failed 😥');
      }
    }
  }, []);

  // console.log(window.location.href);

  async function ProceedToCheckout(e) {
    e.preventDefault();

    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data, cartProducts }),
      });
      if (response.ok) {
        resolve();
        const url = await response.json();
        // console.log('url', url);
        // window.location = await response.json();
        location.assign(url.toString());
      } else {
        reject();
      }
    });

    toast.promise(promise, {
      loading: 'Preparing Your Order ...',
      success: 'Redirecting To Payment',
      error: 'Sorry Something Went Wrong',
    });
  }
  return (
    <section className="mt-8 mx-auto">
      <div className=" text-center mb-4">
        <SectionHeaders mainHeader={'Cart'} />
      </div>
      {cartProducts?.length === 0 && (
        <h1 className="text-center mt-4 font-bold">
          Your Cart Products Is Empty 😞
        </h1>
      )}
      <div>
        {cartProducts?.length > 0 && (
          <div className="grid grid-cols-2 gap-8 mt-8">
            <div className="">
              <Prices total={total} />
              {/* <div className="p-4 flex flex-col  border border-secondary rounded-lg ">
                <div className="flex justify-between items-center">
                  <h1 className="font-semibold text-nowrap text-gray-500">
                    SubTotal:
                  </h1>
                  <IoIosArrowForward />
                  <IoIosArrowForward />
                  <IoIosArrowForward />
                  <IoIosArrowForward />
                  <IoIosArrowForward />
                  <h1 className="float-end mr-4 font-bold p-4 rounded-lg text-gray-500">
                    💲{total}
                  </h1>
                </div>
                <div className="flex justify-between items-center">
                  <h1 className="font-semibold text-nowrap text-gray-500">
                    Delivery:
                  </h1>
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
                  Total: 💲{total + 5}
                </h1>
              </div> */}

              {cartProducts?.length > 0 &&
                cartProducts?.map((product, index) => {
                  return (
                    <div>
                      <div className="flex items-center gap-4 border border-primary my-2 rounded-lg p-4 h-44">
                        <OrderInfo product={product} />
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
              <form onSubmit={ProceedToCheckout}>
                <h1 className="text-white">Checkout:</h1>

                <Address data={{ ...data }} disabled={true} />
                <div className="mt-4">
                  <button className="hover:bg-primary/90 text-lg" type="submit">
                    Pay $<span className="font-bold text-lg">{total + 5}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

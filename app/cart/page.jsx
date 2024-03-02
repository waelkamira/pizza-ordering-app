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

  //? when payment failed
  useEffect(() => {
    if (typeof window?.console !== 'undefined') {
      if (window?.location?.href.includes('canceled=1')) {
        toast.error('Payment Failed 😥');
      }
    }
  }, []);

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
          <div className="flex flex-col sm:grid sm:grid-cols-2 gap-8 mt-8">
            <div className="">
              <Prices total={total} />
              {cartProducts?.length > 0 &&
                cartProducts?.map((product, index) => {
                  return (
                    <div key={product._id}>
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
              <form onSubmit={ProceedToCheckout} id="form">
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

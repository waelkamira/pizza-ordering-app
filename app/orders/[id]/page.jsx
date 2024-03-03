'use client';
import React, { useContext, useEffect, useState } from 'react';
import SectionHeaders from '../../../components/layout/SectionHeaders';
import { CartContext } from '../../../components/ContextProvider';
import { useParams } from 'next/navigation';
import OrderInfo from '../../../components/layout/OrderInfo';
import Address from '../../../components/layout/Address';
import Prices from '../../../components/layout/Prices';
import toast from 'react-hot-toast';

export default function OrderPage() {
  const [order, setOrder] = useState([]);
  const { clearCart } = useContext(CartContext);
  const { id } = useParams();
  const orderId = id.slice(0, -14);

  useEffect(() => {
    if (typeof window?.console !== 'undefined') {
      if (window?.location?.href?.includes('clear-cart=1')) {
        clearCart();
      }
    }

    fetchOrder();
  }, []);

  //? this function to grab the order by orderId
  function fetchOrder() {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/orders').then((res) =>
        res.json().then((res) => {
          const orderOne = res.filter(
            (order) => order._id === id || order._id === orderId
          );
          setOrder(orderOne[0]);
          return res;
        })
      );

      if (response.length > 0) {
        resolve();
      } else {
        reject();
      }
    });

    toast.promise(promise, {
      loading: 'Loading Order ...',
      success: 'Done!',
      error: 'Sorry Something Went Wrong',
    });
  }

  return (
    <section className="mt-8 max-w-3xl mx-auto text-center">
      <SectionHeaders mainHeader="Your Order" />
      <div className="text-center"></div>
      <div className="mt-4 font-semibold">
        <h1>Tank You For Your Order.</h1>
        <p>We Will Call You When Your Order On The Way.</p>
      </div>
      <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4">
        <div className="">
          {order?.cartProducts?.length > 0 &&
            order?.cartProducts?.map((item) => {
              return (
                <dir
                  key={item._id}
                  className="border border-primary p-4 rounded-lg"
                >
                  <OrderInfo product={item} />
                </dir>
              );
            })}
        </div>
        <div>
          <div className="border border-primary rounded-lg p-4 h-fit mt-4">
            <h1>Your Address</h1>
            <Address data={{ ...order }} disabled={true} />
          </div>
          <div className="mt-4">
            <Prices cartProducts={order?.cartProducts} />
          </div>
        </div>
      </div>
    </section>
  );
}

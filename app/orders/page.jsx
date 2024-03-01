'use client';
import React, { useEffect, useState } from 'react';
import SectionHeaders from '../../components/layout/SectionHeaders';
import UserTabs from '../../components/layout/UserTabs';
import UseProfile from '../../components/UseProfile';
import Link from 'next/link';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const { loading, data } = UseProfile();
  useEffect(() => {
    fetchOrders();
  }, []);

  //? this function for fetching orders from mongodb
  async function fetchOrders() {
    await fetch('/api/orders').then((res) =>
      res.json().then((res) => {
        setOrders(res.reverse());
      })
    );
  }

  if (loading) {
    return 'orders are Loading ...';
  }

  return (
    <section className="mt-8 max-w-3xl mx-auto text-center">
      <UserTabs isAdmin={data?.admin} />
      <div className="mt-4">
        <SectionHeaders mainHeader={'Orders'} />
      </div>
      <div className="mt-8">
        {orders?.length > 0 &&
          orders?.map((order, index) => {
            return (
              <div className=" bg-gray-500 mb-2 p-2 rounded-lg text-white">
                <div className="grid grid-cols-4 w-full items-center">
                  <div
                    className={
                      (order?.paid ? 'bg-emerald-400' : 'bg-red-400') +
                      ' transform -skew-x-12 py-2 px-4 rounded-lg w-32 ml-4'
                    }
                  >
                    <h1 className="italic uppercase hover:underline transform skew-x-12">
                      {order?.paid ? 'Paid' : 'Not Paid'}
                    </h1>
                  </div>
                  <div className="mt-6">
                    <div className=" bg-emerald-400 transform -skew-x-12 py-2 px-10 rounded-lg ">
                      <h1 className="transform skew-x-12 text-center">
                        {order.email}
                      </h1>
                    </div>
                    <div className="text-center">
                      {order?.cartProducts.length > 0 &&
                        order?.cartProducts.map((product) => {
                          //   console.log('order._id', order._id);
                          return (
                            <span className="text-sm">
                              {product?.itemName},{' '}
                            </span>
                          );
                        })}
                    </div>
                  </div>
                  <div>
                    <h1>{order?.createdAt.replace('T', ' ').slice(0, 16)}</h1>
                  </div>
                  <div className="flex justify-end mr-3">
                    <Link href={`/orders/` + order._id}>
                      <button className="w-fit text-white hover:bg-primary text-nowrap">
                        Show Order
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
}

'use client';

import UseProfile from '../../components/UseProfile';
import React, { useEffect, useState } from 'react';
import UserTabs from '../../components/layout/UserTabs';
import Link from 'next/link';
import Right from '../../components/icons/Right';
import { CldImage } from 'next-cloudinary';
export default function MenuItemsPage() {
  const { data, loading } = UseProfile();
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch('/api/menuItems').then((res) =>
      res.json().then((res) => {
        setMenuItems(res);
      })
    );
  }, []);

  if (loading) {
    return 'Loading User Info ..';
  }

  if (!data?.admin) {
    return 'Not an Admin';
  }

  return (
    <section className="mt-8 max-w-3xl mx-auto ">
      <UserTabs isAdmin={data.admin} />
      <div className="mt-8">
        <Link
          className="flex justify-center gap-2 border border-gray-400 p-2 rounded-lg font-semibold"
          href={'/menuItems/new'}
        >
          <h1 className=" ">Create New Menu Item</h1>

          <Right />
        </Link>
      </div>
      <div className=" flex flex-col mt-8 sm:grid sm:grid-cols-3">
        {menuItems?.map((menuItem) => (
          <Link
            key={menuItem._id}
            href={`/menuItems/edit/${menuItem._id}`}
            className="flex flex-col items-center bg-gray-500 my-2 p-4 mx-2 rounded-lg text-white"
          >
            <CldImage
              src={`/${menuItem.image}`}
              alt={menuItem.itemName}
              width={100}
              height={100}
            />
            <h1 className="font-semibold mt-4 text-center">
              {menuItem.itemName}
            </h1>
            <h1 className="border border-primary p-2 rounded-lg my-2">
              {menuItem.basePrice} $
            </h1>
            <p className="line-clamp-1 text-gray-300">{menuItem.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

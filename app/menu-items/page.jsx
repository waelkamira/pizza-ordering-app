'use client';

import UseProfile from '../../components/UseProfile';
import React, { useEffect, useState } from 'react';
import UserTabs from '../../components/layout/UserTabs';
import Link from 'next/link';
import Right from '../../components/icons/Right';
import MenuItem from '../../components/menu/MenuItem';

export default function MenuItemsPage() {
  const { data, loading } = UseProfile();
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch('/api/menu-items').then((res) =>
      res.json().then((res) => {
        console.log(res);
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
    <section className="mt-8 max-w-md mx-auto ">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        <Link
          className="button flex justify-center gap-2"
          href={'/menu-items/new'}
        >
          Create New Menu Item
          <Right />
        </Link>
      </div>
      {menuItems?.map((menuItem) => (
        <div>{menuItem.itemName}</div>
      ))}
    </section>
  );
}

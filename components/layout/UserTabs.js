'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function UserTabs({ isAdmin }) {
  const path = usePathname();
  return (
    <div className="flex gap-2 tabs justify-center">
      <Link className={path === `/profile` ? 'active' : ''} href="/profile">
        Profile
      </Link>
      {isAdmin && (
        <>
          <Link
            className={path === `/categories` ? 'active' : ''}
            href="/categories"
          >
            Categories
          </Link>
          <Link
            className={path.includes(`menuItems`) ? 'active' : ''}
            href="/menuItems"
          >
            Menu Items
          </Link>
          <Link
            className={path.includes(`/users`) ? 'active' : ''}
            href="/users"
          >
            Users
          </Link>
        </>
      )}
      <Link className={path === `/orders` ? 'active' : ''} href="/orders">
        orders
      </Link>
    </div>
  );
}

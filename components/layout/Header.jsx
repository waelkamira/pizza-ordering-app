'use client';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/dist/server/api-utils';
import Link from 'next/link';
import React from 'react';

export default function Header() {
  const session = useSession();
  // console.log('session from Header: ', session);

  const status = session?.status;
  const userData = session?.data?.user;
  let userName = userData?.name;

  if (userName?.includes(' ')) {
    userName = userName.split(' ')[0];
  }

  return (
    <header className="flex items-center justify-between">
      <nav className="flex items-center gap-8 tetx-gray-500 font-semibold">
        <Link href="/" className="text-primary font-semibold text-2xl">
          ST PIZZA
        </Link>
        <Link href={'/'}>Home</Link>
        <Link href={''}>Menu</Link>
        <Link href={''}>About</Link>
        <Link href={''}>Contact</Link>
      </nav>
      <nav className="flex items-center gap-4 tetx-gray-500 font-semibold">
        {/* //? if user logged in */}
        {status === 'authenticated' && (
          <>
            <Link href={'/profile'} className="whitespace-nowrap">
              Hello {userName}
            </Link>

            <Link
              href={'/login'}
              className="bg-primary text-white rounded-full px-8 py-2"
              onClick={() => {
                localStorage.clear();
                signOut();
              }}
            >
              Logout
            </Link>
          </>
        )}

        {/* //? if user didn't logged in */}
        {status !== 'authenticated' && (
          <>
            <Link href={'/login'} className="rounded-full px-8 py-2">
              Login
            </Link>
            <Link
              href={'/register'}
              className="bg-primary text-white rounded-full px-8 py-2"
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

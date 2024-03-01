'use client';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import { useContext } from 'react';
import { CartContext } from '../ContextProvider';
import { TiShoppingCart } from 'react-icons/ti';
import { useRouter } from 'next/navigation';
export default function Header() {
  const router = useRouter();
  const { cartProducts } = useContext(CartContext);
  const session = useSession();
  // console.log('session', session);
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
        <Link href={'/menu'}>Menu</Link>
        <Link href={'/#about'}>About</Link>
        <Link href={'/#contact'}>Contact</Link>
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
              onClick={() => {
                localStorage.clear();
                setTimeout(() => {
                  signOut();
                }, 1000);
              }}
              className="bg-primary text-white rounded-full px-8 py-2"
            >
              Logout
            </Link>
            <Link href={'/cart'}>
              <div className="relative">
                {cartProducts?.length > 0 && (
                  <h1 className="absolute -top-1 -right-2 bg-primary rounded-full py-0.5 px-2 text-sm text-white">
                    {cartProducts?.length}
                  </h1>
                )}
                <h1>
                  <TiShoppingCart className="text-4xl text-secondary" />
                </h1>
              </div>
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

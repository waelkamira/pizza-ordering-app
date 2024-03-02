'use client';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { useContext } from 'react';
import { CartContext } from '../ContextProvider';
import { TiShoppingCart } from 'react-icons/ti';
import { useRouter } from 'next/navigation';
import { ImMenu } from 'react-icons/im';
import { FaHome } from 'react-icons/fa';
import { IoMdMenu } from 'react-icons/io';
import { RiContactsBookLine } from 'react-icons/ri';
import { IoIosContacts } from 'react-icons/io';
import { IoMdContact } from 'react-icons/io';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { cartProducts } = useContext(CartContext);
  const session = useSession();
  const status = session?.status;
  const userData = session?.data?.user;
  let userName = userData?.name;

  if (userName?.includes(' ')) {
    userName = userName.split(' ')[0];
  }

  return (
    <div
      onClick={() => setIsOpen(false)}
      className={isOpen ? ' p-4 absolute inset-0' : ' p-4'}
    >
      <Link href="/" className="text-primary font-semibold text-2xl">
        ST PIZZA
      </Link>

      <header className="md:flex items-center justify-between hidden">
        <nav className="flex items-center gap-8 text-secondary font-semibold">
          <Link className="flex gap-2 items-center" href={'/'}>
            <FaHome className="text-primary" />
            Home
          </Link>
          <Link className="flex gap-2 items-center" href={'/menu'}>
            {' '}
            <IoMdMenu className="text-primary" />
            Menu
          </Link>
          <Link className="flex gap-2 items-center" href={'/#about'}>
            {' '}
            <RiContactsBookLine className="text-primary" />
            About
          </Link>
          <Link className="flex gap-2 items-center" href={'/#contact'}>
            {' '}
            <IoIosContacts className="text-primary" />
            Contact
          </Link>
        </nav>
        <nav className="flex items-center gap-4 tetx-gray-500 font-semibold">
          {/* //? if user logged in */}
          {status === 'authenticated' && (
            <>
              <Link
                href={'/profile'}
                className="whitespace-nowrap text-secondary flex gap-2 items-center"
              >
                {' '}
                <IoMdContact className="text-primary" />
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
      <div
        onClick={(e) => e.stopPropagation()}
        className=" flex justify-between"
      >
        <div className="flex items-center justify-between md:hidden ">
          <div onClick={() => setIsOpen(!isOpen)} className={`hover:block`}>
            {isOpen ? (
              <ImMenu className="text-secondary rotate-90" />
            ) : (
              <ImMenu className="text-secondary" />
            )}
          </div>
          <div className="absolute top-24 left-8">
            {!isOpen && <div></div>}
            {isOpen && (
              <>
                <ul className=" items-center justify-between md:hidden bg-secondary rounded-lg text-white p-4 ">
                  <li className=" p-2" onClick={() => setIsOpen(false)}>
                    <Link
                      className="hover:bg-primary hover:text-primary rounded-lg flex gap-2 items-center"
                      href={'/'}
                    >
                      {' '}
                      <FaHome className="text-primary" />
                      Home
                    </Link>
                  </li>

                  <li
                    className="hover:bg-primary rounded-lg p-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <Link
                      href={'/menu'}
                      className="hover:bg-primary hover:text-primary rounded-lg flex gap-2 items-center"
                    >
                      <IoMdMenu className="text-primary" />
                      Menu
                    </Link>
                  </li>

                  <li
                    className="hover:bg-primary rounded-lg p-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <Link
                      href={'/#about'}
                      className="hover:bg-primary hover:text-primary rounded-lg flex gap-2 items-center"
                    >
                      {' '}
                      <RiContactsBookLine className="text-primary" />
                      About
                    </Link>
                  </li>

                  <li
                    className="hover:bg-primary rounded-lg p-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {' '}
                    <Link
                      href={'/#contact'}
                      className="hover:bg-primary hover:text-primary rounded-lg flex gap-2 items-center"
                    >
                      {' '}
                      <IoIosContacts className="text-primary" />
                      Contact
                    </Link>
                  </li>
                  <li
                    className="hover:bg-primary rounded-lg p-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {status === 'authenticated' && (
                      <Link
                        href={'/profile'}
                        className="hover:bg-primary hover:text-primary rounded-lg flex gap-2 items-center"
                      >
                        <IoMdContact className="text-primary" /> Hello{' '}
                        {userName}
                      </Link>
                    )}
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          {/* //? if user logged in */}
          {status === 'authenticated' && (
            <>
              <Link
                href={'/login'}
                onClick={() => {
                  localStorage.clear();
                  setTimeout(() => {
                    signOut();
                  }, 1000);
                }}
                className="bg-primary text-white rounded-full px-4 py-1"
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
        </div>
      </div>
    </div>
  );
}

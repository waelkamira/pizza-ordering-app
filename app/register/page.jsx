'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { CldImage } from 'next-cloudinary';
export default function Register() {
  const session = useSession();
  const status = session?.status;
  const image = session?.data?.user?.image;
  // console.log('this is register session', session);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [userRegistered, setUserRegistered] = useState(false);
  const router = useRouter();
  async function handleSubmitForm(e) {
    e.preventDefault();

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password, image }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        router.push('/login');
        setUserRegistered(true);
        setEmail('');
        setPassword('');
      } else {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 5000);
      }
    } catch (error) {
      console.log('this is error', error);
    }
  }

  return (
    <>
      <section className="mt-8">
        <h1 className="text-center text-primary text-4xl mb-4">Register</h1>
        <form className="block max-w-xs mx-auto" onSubmit={handleSubmitForm}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>

          <div className="my-4 text-center text-gray-500">
            <h1>-- Or --</h1>
          </div>
          <button
            className="flex gap-4 justify-center"
            onClick={() => signIn('google', { callbackUrl: '/login' })}
          >
            <CldImage
              src={'/wm1v3g9lql9dgrgf55nj.png'}
              width={24}
              height={24}
              alt="google"
            ></CldImage>
            Sign Up With Google
          </button>

          {/* when register is success */}
          {userRegistered && (
            <h1 className="bg-green-600 rounded-xl p-3 font-bold text-white text-center">
              Registered Successfully
            </h1>
          )}

          {/* when register is failed */}
          {error && (
            <h1 className="bg-red-600 rounded-xl p-3 font-bold text-white">
              Something Went Wrong Please Try Again
            </h1>
          )}
          <Link href={'/login'}>
            <h1 className="text-center mt-4">
              Already Have An Account?
              <span className="underline"> Login &raquo;</span>
            </h1>
          </Link>
        </form>
      </section>
    </>
  );
}

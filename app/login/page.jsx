'use client';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import React, { useState } from 'react';
import { CldImage } from 'next-cloudinary';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  async function handleSubmitForm(e) {
    e.preventDefault();

    try {
      const res = await signIn('credentials', {
        email,
        password,
        callbackUrl: '/',
      });
    } catch (error) {
      console.log('this is error', error);
    }
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Login</h1>
      <form className="block max-w-xs mx-auto" onSubmit={handleSubmitForm}>
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
        <button type="submit">Login</button>

        <div className="my-4 text-center text-gray-500">
          <h1>-- Or --</h1>
        </div>
        <button
          className="flex gap-4 justify-center"
          onClick={() => signIn('google', { callbackUrl: '/' })}
        >
          <CldImage
            src={'/wm1v3g9lql9dgrgf55nj.png'}
            width={24}
            height={24}
            alt="google"
          ></CldImage>
          Login With Google
        </button>

        <Link href={'/register'}>
          <h1 className="text-center mt-4">
            You Do not Have An Account?
            <span className="underline"> Register &raquo;</span>
          </h1>
        </Link>
      </form>
    </section>
  );
}

'use client';
import { SessionProvider } from 'next-auth/react';

export default function ContextProvider({ children }) {
  // console.log('session from ContextProvider', session);
  return <SessionProvider>{children}</SessionProvider>;
}

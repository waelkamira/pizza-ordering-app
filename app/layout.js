import { Roboto } from 'next/font/google';
import './globals.css';
import ContextProvider from '../components/ContextProvider';
import Header from '../components/layout/Header.jsx';
import { Toaster } from 'react-hot-toast';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <ContextProvider>
        <Toaster />
        <body className={roboto.className}>
          <main className="max-w-4xl border mx-auto p-4">
            <Header />
            {children}
            <footer className="mt-16 border-t p-8 text-center text-gray-500">
              &copy; All Rights Reserved
            </footer>
          </main>
        </body>
      </ContextProvider>
    </html>
  );
}

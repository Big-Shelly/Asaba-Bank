import React from 'react';
import Navbar from '@/components/Navbar';

type Props = {
  children: React.ReactNode;
  title?: string;
};

export default function Layout({ children, title }: Props) {
  return (
    <>
      <Navbar />
      <main className="pt-24 max-w-6xl mx-auto px-6 py-10 min-h-[80vh]">{children}</main>
      <footer className="mt-16 py-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Asaba Bank. All rights reserved.
      </footer>
    </>
  );
}

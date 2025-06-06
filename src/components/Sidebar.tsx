// src/components/Sidebar.tsx
import Link from 'next/link'; // For navigation between pages
import { FC } from 'react';

const Sidebar: FC = () => {
  return (
    <div className="w-64 h-full bg-blue-800 text-white shadow-md">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Weather App</h1>
        <ul>
          <li className="mb-4">
            <Link href="/" className="hover:bg-blue-700 p-2 block rounded-md">Home</Link>
          </li>
          <li className="mb-4">
            <Link href="/about" className="hover:bg-blue-700 p-2 block rounded-md">About</Link>
          </li>
          <li className="mb-4">
            <Link href="/contact" className="hover:bg-blue-700 p-2 block rounded-md">Contact</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;


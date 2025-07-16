import React from 'react';
import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';

const menuOptions = [
  { id: 1, name: 'Home', path: '/dashboard' },
  { id: 2, name: 'History', path: '/dashboard/history' },
  { id: 4, name: 'Pricing', path: '/dashboard/billing' },
];

const AppHeader = () => {
  return (
    <div className="flex items-center justify-between p-4 shadow px-10 md:px-20 lg:px-40 bg-white">
      <Link href="/">
        <div className="flex items-center"><Image
  src="/trans_bg.png"
  alt="logo"
  width={80}
  height={80}
  priority
  unoptimized
/>
<h1 className="text-base font-bold md:text-2xl">MediVox AI</h1> 
</div>
      </Link>
      <div className="hidden md:flex gap-12 items-center">
        {menuOptions.map((option) => (
          <Link key={option.id} href={option.path}>
            <h2 className="hover:font-bold cursor-pointer">{option.name}</h2>
          </Link>
        ))}
      </div>
      <UserButton />
    </div>
  );
};

export default AppHeader;

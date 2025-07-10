import React from 'react'
import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';

const menuOptions=[
    {
        id:1,
        name:'Home',
        path:'/home'
    },
    {
        id:2,
        name:'History',
        path:'/history'
    },
    {
        id:3,
        name:'Billing',
        path:'/biling'
    },
    {
        id:4,
        name:'Pricing',
        path:'/pricing'
    },
    {
        id:5,
        name:'Profile',
        path:'/profile'
    },

]
const AppHeader = () => {
  return (
    <div className='flex items-center justify-between p-4 shadow'>
      <Image src={'/logo.svg'} alt='logo' width={160} height={60} />
      <div className='hidden md:flex gap-12 items-center'>
        {menuOptions.map((option,index)=>(
            <div key={index}>
                <h2 className='hover:font-bold'>{option.name}</h2>
            </div>
        ))}
      </div>
      <UserButton />
    </div>
  )
}

export default AppHeader

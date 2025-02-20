'use client'

import { useParams } from 'next/navigation';
import React from 'react'

export interface BaseLayoutUsersProps {
  overview?: React.ReactNode;
  statistical?: React.ReactNode;
  children?: React.ReactNode;
}

export default function UserLayout({
  children,
  overview,
  statistical,
}: BaseLayoutUsersProps) {
    const { id } = useParams();
    return (
      <div className='w-full h-max flex flex-col items-start p-4'>
        { !id && overview && statistical && <div className='w-full h-auto items-center grid grid-flow-row lg:grid-cols-10 gap-2 pb-20'>
          <div className='col-span-full lg:col-span-3 h-full'>{overview}</div>
          <div className='col-span-full lg:col-span-7 h-full'>{statistical}</div>
        </div>}
        {children}
      </div>
    )
}

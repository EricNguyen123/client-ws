import { Props } from '@/types';
import { getTranslations } from 'next-intl/server';
import React from 'react'

export async function generateMetadata({
  params
}: Omit<Props, 'children'>) {
  const { locale } = await params;
  const t = await getTranslations({locale, namespace: 'Account'});

  return {
    title: t('users.title')
  };
}

export interface LayoutUsersProps extends Props {
  overview: React.ReactNode;
  statistical: React.ReactNode;
}


export default function LayoutUsers({
  children,
  overview,
  statistical,
}: LayoutUsersProps) {
  return (
    <div className='w-full h-full flex flex-col items-start p-4'>
      <div className='w-full h-auto items-center grid grid-flow-row lg:grid-cols-10 gap-2 pb-20'>
        <div className='col-span-full lg:col-span-3 h-full'>{overview}</div>
        <div className='col-span-full lg:col-span-7 h-full'>{statistical}</div>
      </div>
      {children}
    </div>
  )
}

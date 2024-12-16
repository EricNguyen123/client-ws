import BaseSidebar from '@/components/account/sidebar/BaseSidebar';
import CustomSidebar from '@/components/account/sidebar/CustomSidebar';
import { menuAccount } from '@/constant/menuAccount';
import { Props } from '@/types';
import { getTranslations } from 'next-intl/server';
import React from 'react'

export async function generateMetadata({
  params
}: Omit<Props, 'children'>) {
  const { locale } = await params;
  const t = await getTranslations({locale, namespace: 'Layout'});

  return {
    title: t('LayoutAccount.title')
  };
}

export default function LayoutAccount({
  children
}: Props) {
  const options = menuAccount()
  return (
    <div className='w-full h-full flex items-start flex-col lg:flex-row'>
      <div className='h-full hidden lg:flex flex-col items-center justify-center duration-200'>
        <BaseSidebar options={options}/>
      </div>
      <div className='flex px-4 pb-3 lg:pb-0 lg:hidden items-center justify-center duration-200'>
        <CustomSidebar options={options}/>
      </div>
      <div className='lg:pl-3 w-full h-full overflow-auto'>
        {children}
      </div>
    </div>
  )
}

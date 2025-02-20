import BaseSidebar from '@/components/account/sidebar/BaseSidebar';
import ScrollToTopButton from '@/components/float-button/ScrollToTopButton';
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
    <div className='w-full h-full flex items-start flex-col md:flex-row'>
      <div className='h-full hidden md:flex flex-col items-center justify-center duration-200'>
        <BaseSidebar options={options}/>
      </div>
      {/* <div className='flex px-4 pb-3 md:pb-0 md:hidden items-center justify-center duration-200'>
        <CustomSidebar options={options}/>
      </div> */}
      <div className='md:pl-3 w-full h-full overflow-auto' id='scrollable-container'>
        {children}
      </div>
      <ScrollToTopButton/>
    </div>
  )
}

/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import {useTranslations} from 'next-intl';
import NavigationLink from './NavigationLink';
import { BaseMenu } from './BaseMenu';
import SignMenu from './sign-menu/SignMenu';
import Account from './account/Account';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import CustomSidebar from './account/sidebar/CustomSidebar';
import { menuAccount } from '@/constant/menuAccount';

export default function Navigation() {
  const t = useTranslations('Navigation');
  const authSelector = useSelector(({ auth } : any) => auth);
  const [logined, setLogined] = useState<boolean>(false);
  const options = menuAccount();

  useEffect(() => {
    if (authSelector.authenticated) {
      setLogined(true);
    } else {
      setLogined(false);
    }
  }, [authSelector.authenticated]);
  
  return (
    <div className="bg-slate-850 w-full">
      <nav className="flex items-center justify-between p-2 lg:px-20 px-6">
        <div className='hidden md:flex items-center justify-start space-x-2'>
          <NavigationLink href="/">{t('home')}</NavigationLink>
          <NavigationLink href="/pathnames">{t('pathnames')}</NavigationLink>
        </div>
        <div className='flex px-4 md:pb-0 md:hidden items-center justify-center duration-200'>
          <CustomSidebar options={options}/>
        </div>
        <div className='flex items-center justify-between w-max space-x-3'>
          {logined ? <Account/> : <SignMenu/>}
          <BaseMenu/>
        </div>
      </nav>
    </div>
  );
}

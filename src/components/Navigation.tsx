/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import {useTranslations} from 'next-intl';
import NavigationLink from './NavigationLink';
import { BaseMenu } from './BaseMenu';
import SignMenu from './sign-menu/SignMenu';
import Account from './account/Account';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function Navigation() {
  const t = useTranslations('Navigation');
  const authSelector = useSelector(({ auth } : any) => auth);
  const [logined, setLogined] = useState<boolean>(false);

  useEffect(() => {
    if (authSelector.authenticated) {
      setLogined(true);
    } else {
      setLogined(false);
    }
  }, [authSelector.authenticated]);
  
  return (
    <div className="bg-slate-850 w-full">
      <nav className="flex items-center justify-between p-2 px-20">
        <div>
          <NavigationLink href="/">{t('home')}</NavigationLink>
          <NavigationLink href="/pathnames">{t('pathnames')}</NavigationLink>
        </div>
        <div className='flex items-center justify-between w-max space-x-3'>
          {logined ? <Account/> : <SignMenu/>}
          <BaseMenu/>
        </div>
      </nav>
    </div>
  );
}

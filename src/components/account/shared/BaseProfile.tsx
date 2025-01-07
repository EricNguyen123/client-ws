/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useTranslations } from 'next-intl';
import React from 'react'
import EditInfo from './EditInfo';
import EditPassword from './EditPassword';
import EditAddress from './EditAddress';
import { useSelector } from 'react-redux';

export default function BaseProfile() {
  const t = useTranslations('Account');
  const userSelector = useSelector(({ user } : any) => user.userInfo);

  return (
    <div className='w-full space-y-10'>
      <div className='w-full flex items-start justify-start flex-col'>
        <span className='text-xl font-bold'>{t("profile.titleBox.header")}</span>
      </div>
      <div className='w-full flex items-start justify-start flex-col space-y-10'>
        <EditInfo userSelector={userSelector}/>
        <EditPassword userSelector={userSelector}/>
        <EditAddress userSelector={userSelector}/>
      </div>
    </div>
  )
}

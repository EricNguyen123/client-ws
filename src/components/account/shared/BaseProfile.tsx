/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useTranslations } from 'next-intl';
import React from 'react'
import EditInfo from './EditInfo';
import EditPassword from './EditPassword';
import EditAddress from './EditAddress';

export default function BaseProfile() {
  const t = useTranslations('Account');
  

  return (
    <div className='w-full'>
      <div className='w-full flex items-start justify-start flex-col mb-10'>
        <span className='text-xl font-bold'>{t("profile.titleBox.header")}</span>
      </div>
      <div className='w-full flex items-start justify-start flex-col space-y-10'>
        <EditInfo/>
        <EditPassword/>
        <EditAddress/>
      </div>
    </div>
  )
}

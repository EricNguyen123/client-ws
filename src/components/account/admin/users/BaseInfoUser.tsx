/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import EditAddress from '@/components/account/shared/EditAddress';
import EditInfo from '@/components/account/shared/EditInfo';
import EditPassword from '@/components/account/shared/EditPassword';
import ButtonBack from '@/components/ButtonBack';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import ActiveUser from '../../shared/ActiveUsers';

export default function BaseInfoUser({ id }: { id: string}) {
  const t = useTranslations('Account');
  const userSelector = useSelector(({ user } : any) => user.pages.users);
  const [information, setInformation] = useState<any>({});

  useEffect(() => {
    if (userSelector && userSelector.length > 0) {
      const page = userSelector.find((p: any) => p.id === id);
      if (page) {
        setInformation(page);
      }
    }
  }, [userSelector, id])

  return (
    <div className='w-full'>
      <div className='w-full flex items-center justify-start flex-row mb-10 space-x-3'>
        <ButtonBack/>
        <span className='text-xl font-bold'>{t("users.headerInfo")}</span>
      </div>
      <div className='w-full flex items-start justify-start flex-col space-y-10'>
        <EditInfo userSelector={information}/>
        <ActiveUser userSelector={information}/>
        <EditPassword userSelector={information} actions={"forgot"}/>
        <EditAddress userSelector={information}/>
      </div>
    </div>
  )
}

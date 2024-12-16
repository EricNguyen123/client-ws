/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { ErrorNumber } from '@/common/general';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { statisticalUser } from '@/store/user/actions';
import { StatisticalUsersProps } from '@/types';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function OverView() {
  const t = useTranslations('Account');
  const dispatch = useDispatch();
  const userSelector = useSelector(({ user } : any) => user.statistical);
  const [statistical, setStatistical] = useState<StatisticalUsersProps>();
  
  useEffect(() => {
    dispatch(statisticalUser({
      setError: (error) => {
        if(error.status >= ErrorNumber.ErrorCode) {
          
        }
      },
      setSuccess: (success) => {
        if(success.status >= ErrorNumber.Success && success.status < ErrorNumber.Warning) {
          
        }
      },
    }))
  }, [])

  useEffect(() => {
    if (userSelector) {
      setStatistical(userSelector)
    }
  }, [userSelector])


  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>{t('users.overView.title')}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <div className='w-full grid grid-flow-col grid-rows-4 gap-1'>
          <div className='w-full flex items-center justify-between'>
            <div className='w-[80%] flex items-center justify-start'>
              <span className='text-nowrap'>{t('users.overView.description_1')}</span>
            </div>
            <div className='px-4'>
              <span>{statistical?.totalUsers}</span>
            </div>
          </div>
          <div className='w-full flex items-center justify-between'>
            <div className='w-[80%] flex items-center justify-start'>
              <span>{t('users.overView.description_2')}</span>
            </div>
            <div className='px-4'>
              <span>{statistical?.totalUsersNotActive}</span>
            </div>
          </div>
          <div className='w-full flex items-center justify-between'>
            <div className='w-[80%] flex items-center justify-start'>
              <span>{t('users.overView.description_3')}</span>
            </div>
            <div className='px-4'>
              <span>{statistical?.usersVisited}</span>
            </div>
          </div>
          <div className='w-full flex items-center justify-between'>
            <div className='w-[80%] flex items-center justify-start'>
              <span>{t('users.overView.description_4')}</span>
            </div>
            <div className='px-4'>
              <span>{statistical?.usersNewSubscribers}</span>
            </div>
          </div>
          
        </div>
      </CardContent>
    </Card>
  )
}

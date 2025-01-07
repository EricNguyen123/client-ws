/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import BoxInfoItem from './BoxInfoItem';
import { OptionsBaseInfo } from '@/types';
import ActiveStatus from './ActiveStatus';
import ActiveRole from './ActiveRole';

export default function ActiveUser({ userSelector }: { userSelector: any }) {
  const t = useTranslations('Account');
  const [optionsActiveStatus, setOptionsActiveStatus] = useState<OptionsBaseInfo[]>([])

  useEffect(() => {
    setOptionsActiveStatus([
      {
        name: t('profile.status'),
        content: <ActiveStatus userSelector={userSelector}/>,
      },
      {
        name: t('profile.role'),
        content: <ActiveRole userSelector={userSelector}/>,
      }
    ])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSelector])

  return (
    <BoxInfoItem 
            options={optionsActiveStatus} 
            title={t("profile.titleBox.subheaderActiveUser")}/>
  )
}

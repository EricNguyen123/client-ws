/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import RegisterUser from '@/components/account/admin/users/RegisterUser';
import { OptionsProps } from '@/components/float-button/BaseButton';
import { Trash2, UserPlus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React from 'react'
import { columnsKey } from './columns';

export default function moreTableUsers(): OptionsProps[] {
  const t = useTranslations("Tables");

  return [
    {
      icon: <UserPlus />,
      content: t("users.more.add"),
      dialog: <RegisterUser/>
    },
    {
      icon: <Trash2 />,
      content: t("users.more.delete"),
      key: { [columnsKey.select]: true },
      color: "text-red-500 focus:text-red-500"
    }
  ]
}

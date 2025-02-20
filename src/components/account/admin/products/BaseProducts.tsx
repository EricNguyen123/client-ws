import { useTranslations } from 'next-intl';
import React from 'react'

export default function BaseProducts() {
  const t = useTranslations("Account");
  return (
    <div className='w-full flex flex-col items-start justify-center space-y-10'>
      <div className='w-full flex items-start justify-start flex-col'>
        <span className='text-xl font-bold text-nowrap'>{t("products.listTitle")}</span>
      </div>
    </div>
  )
}

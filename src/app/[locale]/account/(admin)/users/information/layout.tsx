import { Props } from '@/types';
import { getTranslations } from 'next-intl/server';
import React from 'react'

export async function generateMetadata({
  params
}: Omit<Props, 'children'>) {
  const { locale } = await params;
  const t = await getTranslations({locale, namespace: 'Account'});

  return {
    title: t('users.titleInfo')
  };
}

export default function LayoutInfomation({
  children,
}: Props) {
  return (
    <div className='w-full h-max flex flex-col items-start'>
      {children}
    </div>
  )
}

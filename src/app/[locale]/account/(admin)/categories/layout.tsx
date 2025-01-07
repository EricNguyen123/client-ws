import { Props } from '@/types';
import { getTranslations } from 'next-intl/server';
import React from 'react'

export async function generateMetadata({
  params
}: Omit<Props, 'children'>) {
  const { locale } = await params;
  const t = await getTranslations({locale, namespace: 'Account'});

  return {
    title: t('categories.title')
  };
}

export default function LayoutCategories({
  children,
}: Props) {
  return (
      <div className='w-full h-full flex flex-col items-start p-4'>
        {children}
      </div>
  )
}

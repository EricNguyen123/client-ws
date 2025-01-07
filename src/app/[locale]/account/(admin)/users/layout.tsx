import { Props } from '@/types';
import { getTranslations } from 'next-intl/server';
import React from 'react'
import UserLayout from './UserLayout';

export async function generateMetadata({
  params
}: Omit<Props, 'children'>) {
  const { locale } = await params;
  const t = await getTranslations({locale, namespace: 'Account'});

  return {
    title: t('users.title')
  };
}

export interface LayoutUsersProps extends Props {
  overview?: React.ReactNode;
  statistical?: React.ReactNode;
}


export default function LayoutUsers({
  children,
  overview,
  statistical,
}: LayoutUsersProps) {
  return (
    <UserLayout overview={overview} statistical={statistical}>
      {children}
    </UserLayout>
  )
}

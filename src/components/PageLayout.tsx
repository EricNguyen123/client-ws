/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import config from '@/config';
import { usePathname, useRouter } from '@/i18n/routing';
import { loginWithGoogle } from '@/store/auth/actions';
import {useTranslations} from 'next-intl';
import { useSearchParams } from 'next/navigation';
import {ReactNode, useEffect} from 'react';
import { useDispatch } from 'react-redux';

type Props = {
  children?: ReactNode;
  title: ReactNode;
};

export default function PageLayout({children, title}: Props) {
  const t = useTranslations('PageLayout');
  const dispatch = useDispatch()
  const routes = useRouter()
  const searchParams = useSearchParams()
  const tokenFromUrl = searchParams.get('token');
  
  useEffect(() => {
    if (tokenFromUrl) {
      const emailFromUrl = searchParams.get('email');
      dispatch(loginWithGoogle({
        email: emailFromUrl,
      }))
      routes.push(config.routes.public.home)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenFromUrl]);

  return (
    <div className="relative flex grow flex-col bg-slate-850 py-36">
      
      
    </div>
  );
}

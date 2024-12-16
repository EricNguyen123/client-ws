'use client'

import { LogIn } from 'lucide-react'
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '../ui/dialog';
import SigninForm from './SigninForm';
import { usePathname, useRouter } from '@/i18n/routing';
import config from '@/config';
import { SessionProvider } from 'next-auth/react';

const ButtonSignin = ({ handleClick }: { handleClick?: () => void }) => {
  const t = useTranslations("SignMenu");
  return (
    <div
      className='flex items-center justify-between w-max cursor-pointer'
      onClick={handleClick}
    >
      <LogIn className='mr-2'/>
      <span className='text-sm font-semibold'>{t("signIn")}</span>
    </div>
  )
}

export default function SignMenu() {
  const pathname = usePathname();
  const [check, setCheck] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    if (pathname === `/${config.routes.public.register}`) {
      router.push(`${config.routes.public.login}`)
    }
  }

  useEffect(() => {
    if (pathname === `/${config.routes.public.login}` || pathname === `/${config.routes.public.register}`) {
      setCheck(true)
    } else {
      setCheck(false)
      setOpen(false)
    }
  }, [pathname])

  return (
    <>
      {
        check ? 
        <ButtonSignin handleClick={handleClick}/> : 
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <ButtonSignin/>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle className='hidden'></DialogTitle>
            <DialogDescription className='hidden'></DialogDescription>
            <SessionProvider>
              <SigninForm/>
            </SessionProvider>
          </DialogContent>
        </Dialog>
      }
    </>
  )
}

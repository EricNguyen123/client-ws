/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useEffect, useState } from 'react'
import { DropdownMenuItem, DropdownMenuSeparator } from '../ui/dropdown-menu'
import { CircleCheckBig, LogOut } from 'lucide-react'
import { useTranslations } from "next-intl"
import { useDispatch, useSelector } from 'react-redux';
import config from '@/config'
import { logout } from '@/store/auth/actions'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from '@/i18n/routing'

export default function SignOut() {
  const t = useTranslations('BaseMenu');
  const router = useRouter();
  const dispatch = useDispatch();
  const authSelector = useSelector(({ auth } : any) => auth);
  const [logined, setLogined] = useState<boolean>(false);
  const { toast } = useToast()
  
  useEffect(() => {
    if (authSelector.authenticated) {
      setLogined(true)
    } else if (logined) {
      setLogined(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authSelector.authenticated]);

  const handleLogout = () => {
    const handleRedirect = () => {
      router.push(`${config.routes.public.home}`)
      toast({
        title: t('success.title'),
        description: <div className="flex items-center justify-start">
          <CircleCheckBig className="mr-5"/>{t('success.description')}
        </div>,
      });
    }
    dispatch(logout({ handleRedirect: handleRedirect }))
  }

  return (
    <>
      {logined ? 
      <>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <div 
            className="flex items-center justify-between w-full text-red-500"
            onClick={handleLogout}
          >
            {t("signOut")}
            <span className="text-red-500">
              <LogOut className="size-5"/>
            </span>
          </div>
        </DropdownMenuItem>
      </> : undefined}
    </>
    
  )
}

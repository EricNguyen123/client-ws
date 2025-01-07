/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { OptionsProps } from '@/components/float-button/BaseButton';
import { Check, PencilOff, PenLine, Trash2, } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React from 'react'
import { ErrorNumber } from '@/common/general';
import { useDispatch } from 'react-redux';
import { useToast } from '@/hooks/use-toast';
import ContentDelete from '@/components/delete/ContentDelete';
import { deleteBanner } from '@/store/banners/actions';
import EditBanners from '@/components/account/admin/banners/EditBanners';

export default function actionsBanners(i: any): OptionsProps[] {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const t = useTranslations('Account');

  const handleDelete = (e: any) => {
    dispatch(deleteBanner({
      data: { id: i },
      setError: (error) => {
        if(error.status >= ErrorNumber.ErrorCode) {
          toast({
            title: t("banners.delete.error.title"),
            description: <div className="flex items-center justify-start">
              <PencilOff className="mr-5 text-red-500"/>{t("banners.delete.error.description")}
            </div>,
          })
        }
      },
      setSuccess: (success) => {
        if (success.status >= ErrorNumber.Success && success.status < ErrorNumber.Warning) {
          e()
          toast({
            title: t("banners.delete.success.title"),
            description: <div className="flex items-center justify-start">
              <Check className="mr-5 text-emerald-500"/>{t("banners.delete.success.description")}
            </div>,
          })
        }
      }
    }))
  }

  return [
    {
      icon: <PenLine />,
      content: t('banners.actions.edit'),
      dialog: <EditBanners id={i}/>,
    },
    {
      icon: <Trash2 />,
      content: t('banners.actions.delete'),
      color: "text-red-500 focus:text-red-500",
      dialog: <ContentDelete 
                handle={handleDelete} 
                title={t('banners.delete.title')}
                content={t('banners.delete.confirm')}/>
    }
  ]
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { OptionsProps } from '@/components/float-button/BaseButton';
import { Check, PencilOff, Trash2, } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React from 'react'
import { ErrorNumber } from '@/common/general';
import { useDispatch } from 'react-redux';
import { useToast } from '@/hooks/use-toast';
import ContentDelete from '@/components/delete/ContentDelete';
import { deleteColor } from '@/store/colors/actions';

export default function actionsColors(i: any): OptionsProps[] {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const t = useTranslations('Account');

  const handleDelete = (e: any) => {
    dispatch(deleteColor({
      data: { id: i },
      setError: (error) => {
        if(error.status >= ErrorNumber.ErrorCode) {
          toast({
            title: t("products.delete.error.title"),
            description: <div className="flex items-center justify-start">
              <PencilOff className="mr-5 text-red-500"/>{t("products.delete.error.description")}
            </div>,
          })
        }
      },
      setSuccess: (success) => {
        if (success.status >= ErrorNumber.Success && success.status < ErrorNumber.Warning) {
          e()
          toast({
            title: t("products.delete.success.title"),
            description: <div className="flex items-center justify-start">
              <Check className="mr-5 text-emerald-500"/>{t("products.delete.success.description")}
            </div>,
          })
        }
      }
    }))
  }

  return [
    {
      icon: <Trash2 />,
      content: t('products.actions.delete_color'),
      color: "text-red-500 focus:text-red-500",
      dialog: <ContentDelete 
                handle={handleDelete} 
                title={t('products.delete.title_color')}
                content={t('products.delete.confirm_color')}/>
    }
  ]
}

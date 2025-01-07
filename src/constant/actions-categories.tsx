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
import EditCategories from '@/components/account/admin/categories/EditCategories';
import { deleteCategories } from '@/store/categories/actions';

export default function actionsCategories(i: any): OptionsProps[] {
  const dispatch = useDispatch()
  const { toast } = useToast();
  const t = useTranslations('Account');

  const handleDelete = (e: any) => {
    dispatch(deleteCategories({
      data: { id: i },
      setError: (error) => {
        if(error.status >= ErrorNumber.ErrorCode) {
          toast({
            title: t("categories.delete.error.title"),
            description: <div className="flex items-center justify-start">
              <PencilOff className="mr-5 text-red-500"/>{t("categories.delete.error.description_1")}
            </div>,
          })
        }
      },
      setSuccess: (success) => {
        if (success.status >= ErrorNumber.Success && success.status < ErrorNumber.Warning) {
          e()
          toast({
            title: t("categories.delete.success.title"),
            description: <div className="flex items-center justify-start">
              <Check className="mr-5 text-emerald-500"/>{t("categories.delete.success.description_1")}
            </div>,
          })
        }
      }
    }))
  }

  return [
    {
      icon: <PenLine />,
      content: t('categories.actions.edit'),
      dialog: <EditCategories idItem={i}/>,
    },
    {
      icon: <Trash2 />,
      content: t('categories.actions.delete'),
      color: "text-red-500 focus:text-red-500",
      dialog: <ContentDelete 
                handle={handleDelete} 
                title={t('categories.delete.title_1')}
                content={t('categories.delete.confirm_1')}/>
    }
  ]
}

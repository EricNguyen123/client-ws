/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { OptionsProps } from '@/components/float-button/BaseButton';
import { Check, Copy, PencilOff, Trash2, UserRoundCog } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React from 'react'
import { actionsKey } from './columns';
import { ErrorNumber } from '@/common/general';
import { useDispatch } from 'react-redux';
import { useToast } from '@/hooks/use-toast';
import ContentDelete from '@/components/delete/ContentDelete';
import { deleteUser } from '@/store/user/actions';

export default function actionsUserTable(i: any): OptionsProps[] {
  const dispatch = useDispatch()
  const { toast } = useToast();
  const tTable = useTranslations('Tables');
  const handleDelete = (e: any) => {
    dispatch(deleteUser({
      data: { id: i },
      setError: (error) => {
        if(error.status >= ErrorNumber.ErrorCode) {
          toast({
            title: tTable("users.delete.error.title"),
            description: <div className="flex items-center justify-start">
              <PencilOff className="mr-5 text-red-500"/>{tTable("users.delete.error.description_1")}
            </div>,
          })
        }
      },
      setSuccess: (success) => {
        if (success.status >= ErrorNumber.Success && success.status < ErrorNumber.Warning) {
          e()
          toast({
            title: tTable("users.delete.success.title"),
            description: <div className="flex items-center justify-start">
              <Check className="mr-5 text-emerald-500"/>{tTable("users.delete.success.description_1")}
            </div>,
          })
        }
      }
    }))
  }

  return [
    {
      icon: <Copy />,
      content: tTable('users.actions.userId'),
      key: actionsKey.copyId,
    },
    {
      icon: <UserRoundCog />,
      content: tTable('users.actions.view'),
    },
    {
      icon: <Trash2 />,
      content: tTable('users.actions.delete'),
      color: "text-red-500 focus:text-red-500",
      dialog: <ContentDelete 
                handle={handleDelete} 
                title={tTable('users.delete.title_1')}
                content={tTable('users.delete.confirm_1')}/>
    }
  ]
}

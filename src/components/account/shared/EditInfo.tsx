/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import BoxInfoItem from './BoxInfoItem';
import { BoxEdit } from './BoxEdit';
import { updateAccount } from '@/store/user/actions';
import { ErrorNumber } from '@/common/general';
import { useToast } from '@/hooks/use-toast';
import { Check, PencilOff } from 'lucide-react';
import { OptionsBaseInfo } from '@/types';

export default function EditInfo() {
  const t = useTranslations('Account');
  const [options, setOptions] = useState<OptionsBaseInfo[]>([])
  const dispatch = useDispatch();
  const userSelector = useSelector(({ user } : any) => user.userInfo);
  const { toast } = useToast()

  useEffect(() => {
    if (userSelector) {
      setOptions([
        {
          name: t('profile.name'),
          content: userSelector?.name
        },
        {
          name: t('profile.email'),
          content: userSelector?.email
        }
      ])
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSelector])

  const handleChangesEdit = (values: { [key: string]: string }) => {
    dispatch(updateAccount({ 
      data: {
        ...userSelector,
        id: userSelector?.id,
        email: values[t('profile.email')],
        name: values[t('profile.name')],
      }, 
      setError: (error) => {
        if(error.status >= ErrorNumber.ErrorCode) {
          toast({
            title: t("profile.error.title"),
            description: <div className="flex items-center justify-start">
              <PencilOff className="mr-5 text-red-500"/>{t("profile.error.descriptionEditProfile")}
            </div>,
          })
        }
      },
      setSuccess: (success) => {
        if(success.status >= ErrorNumber.Success && success.status < ErrorNumber.Warning) {
          toast({
            title: t("profile.success.title"),
            description: <div className="flex items-center justify-start">
              <Check className="mr-5 text-emerald-500"/>{t("profile.success.descriptionEditProfile")}
            </div>,
          })
        }
      },
    }))
  }

  const editComponent = options.length > 0 && <BoxEdit 
                          options={options}
                          title={t("profile.edit.editProfile")}
                          labelBtn={t("profile.edit.labelBtn")}
                          onSubmit={handleChangesEdit}
                        />
                    
  return (
    <BoxInfoItem 
          editComponent={editComponent} 
          options={options} 
          title={t("profile.titleBox.subheaderInfo")}/>
  )
}

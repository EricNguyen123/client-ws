/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import BoxInfoItem from './BoxInfoItem';
import { BoxEdit } from './BoxEdit';
import { changePassword } from '@/store/user/actions';
import { ErrorNumber } from '@/common/general';
import { useToast } from '@/hooks/use-toast';
import { Check, PencilOff } from 'lucide-react';
import { OptionsBaseInfo } from '@/types';
import ForgotPassword from './ForgotPassword';
import EditForgotPassword from './EditForgotPassword';

export default function EditPassword({ userSelector, actions = 'all' }: { userSelector: any, actions?: 'all' | 'password' | 'forgot' }) {
  const t = useTranslations('Account');
  const [optionsPassword, setOptionsPassword] = useState<OptionsBaseInfo[]>([])
  const optionsChangePassword: OptionsBaseInfo[] = [
    {
      name: t('profile.currentPassword'),
      placeholder: t('profile.placeholderYourPassword'),
      type: "password",
    },
    {
      name: t('profile.newPassword'),
      placeholder: t('profile.placeholderNewPassword'),
      type: "password",
    },
    {
      name: t('profile.confirmNewPassword'),
      placeholder: t('profile.placeholderConfirmNewPassword'),
      type: "password",
    },
  ]
  const dispatch = useDispatch();
  const { toast } = useToast()

  useEffect(() => {
    setOptionsPassword(actions === 'all' ? [
      {
        name: t('profile.password'),
        content: editPasswordLink,
        type: "password",
      },
      {
        name: t('profile.forgotPassword'),
        content: <ForgotPassword/>,
      },
    ] : actions === 'password' ? [
      {
        name: t('profile.password'),
        content: editPasswordLink,
        type: "password",
      }
    ] : 
    [
      {
        name: t('profile.password'),
        content: <EditForgotPassword openDialog={false} userId={userSelector?.id}/>,
        type: "password",
      }
    ])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSelector])

  const handleChangesPasswordEdit = (values: { [key: string]: string }) => {
    dispatch(changePassword({ 
      data: {
        id: userSelector?.id,
        currentPassword: values[t('profile.currentPassword')],
        newPassword: values[t('profile.newPassword')],
        confirmPassword: values[t('profile.confirmNewPassword')],
      }, 
      setError: (error) => {
        if(error.status >= ErrorNumber.ErrorCode) {
          toast({
            title: t("profile.error.title"),
            description: <div className="flex items-center justify-start">
              <PencilOff className="mr-5 text-red-500"/>{t("profile.error.descriptionEditPassword")}
            </div>,
          })
        }
      },
      setSuccess: (success) => {
        if(success.status >= ErrorNumber.Success && success.status < ErrorNumber.Warning) {
          toast({
            title: t("profile.success.title"),
            description: <div className="flex items-center justify-start">
              <Check className="mr-5 text-emerald-500"/>{t("profile.success.descriptionEditPassword")}
            </div>,
          })
        }
      },
    }))
  }

  const editPasswordComponent = optionsChangePassword.length > 0 && <BoxEdit 
                      options={optionsChangePassword}
                      title={t("profile.edit.editPassword")}
                      labelBtn={t("profile.edit.labelBtn")}
                      onSubmit={handleChangesPasswordEdit}
                    />

  const editPasswordLink = optionsChangePassword.length > 0 && <BoxEdit 
                      options={optionsChangePassword}
                      title={t("profile.edit.editPassword")}
                      labelBtn={t("profile.edit.labelBtn")}
                      onSubmit={handleChangesPasswordEdit}
                      icon={<span className='text-base font-medium'>{t('profile.changeYourPassword')}</span>}
                      variantBtn={"link"}
                    />

  return (
    <BoxInfoItem 
            editComponent={editPasswordComponent} 
            options={optionsPassword} 
            title={t("profile.titleBox.subheaderChangePassword")}/>
  )
}

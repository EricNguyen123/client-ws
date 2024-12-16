'use client'

import { useTranslations } from 'next-intl';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BoxEdit } from './BoxEdit';
import { ErrorNumber } from '@/common/general';
import { useToast } from '@/hooks/use-toast';
import { Check, PencilOff } from 'lucide-react';
import { OptionsBaseInfo } from '@/types';
import { changeForgotPassword } from '@/store/auth/actions';

type EditForgotPasswordProps = {
  openDialog: boolean;
}

export default function EditForgotPassword({ openDialog }: EditForgotPasswordProps) {
  const t = useTranslations('Account');
  const optionsChangePassword: OptionsBaseInfo[] = [
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
  const authSelector = useSelector(({ auth } : any) => auth);
  const { toast } = useToast()

  const handleChangesPasswordEdit = (values: { [key: string]: string }) => {
    dispatch(changeForgotPassword({ 
      data: {
        id: authSelector.otp?.userId,
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
  return (
    <>
    {optionsChangePassword.length > 0 && <BoxEdit 
                      options={optionsChangePassword}
                      title={t("profile.edit.editPassword")}
                      labelBtn={t("profile.edit.labelBtn")}
                      onSubmit={handleChangesPasswordEdit}
                      openDialog={openDialog}
                      useTrigger={false}
                    />}
    </>
  )
}

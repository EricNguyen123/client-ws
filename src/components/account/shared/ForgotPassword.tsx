/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { useTranslations } from 'next-intl';
import { BoxEdit } from './BoxEdit';
import { OptionsBaseInfo } from '@/types';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '@/hooks/use-toast';
import { forgotPassword } from '@/store/auth/actions';
import { ErrorNumber } from '@/common/general';
import { Check, PencilOff, RouteOff } from 'lucide-react';
import { OTP } from './OTP';
import EditForgotPassword from './EditForgotPassword';
import { cn } from '@/lib/utils';

export default function ForgotPassword({ className }: { className?:string  }) {
  const t = useTranslations('Account');
  const options: OptionsBaseInfo[] = [
    {
      name: t('profile.email'),
      placeholder: t('profile.placeholderYourEmail'),
      type: "email",
    }
  ]
  const dispatch = useDispatch();
  const authSelector = useSelector(({ auth } : any) => auth);
  const userSelector = useSelector(({ user } : any) => user);
  const { toast } = useToast();
  const [openVerifyOTP, setOpenVerifyOTP] = useState<boolean>(false);
  const [emailVerifyOTP, setEmailVerifyOTP] = useState<string>("");
  const [openDialogPassword, setOpenDialogPassword] = useState<boolean>(false);

  const handleOpenDialogPassword = (i: boolean) => {
    if (i) {
      setOpenVerifyOTP(false);
    }
    setOpenDialogPassword(i);
  }

  const handleDispatch = (values: string) => {
    dispatch(forgotPassword({ 
      data: {
        email: values,
      }, 
      setError: (error) => {
        if(error.status >= ErrorNumber.ErrorCode) {
          toast({
            title: t("profile.error.title"),
            description: <div className="flex items-center justify-start">
              <PencilOff className="mr-5 text-red-500"/>{t("profile.error.descriptionForgotPassword")}
            </div>,
          })
        }
      },
      setSuccess: (success) => {
        if(success.status === ErrorNumber.Success) {
          setOpenVerifyOTP(true);
          setEmailVerifyOTP(values);
          toast({
            title: t("profile.success.title"),
            description: <div className="flex items-center justify-start">
              <Check className="mr-5 text-emerald-500"/>{t("profile.success.descriptionForgotPassword")}
            </div>,
          })
        } else if (success.status === ErrorNumber.Information) {
          toast({
            title: t("profile.success.titleNotice"),
            description: <div className="flex items-center justify-start">
              <RouteOff className="mr-5 text-yellow-500"/>{t("profile.success.description201")}
            </div>,
          })
        } else if (success.status === ErrorNumber.NotFound) {
          toast({
            title: t("profile.success.titleNotice"),
            description: <div className="flex items-center justify-start">
              <RouteOff className="mr-5 text-yellow-500"/>{t("profile.success.description404")}
            </div>,
          })
        } else if (success.status === ErrorNumber.InvalidValue) {
          toast({
            title: t("profile.success.titleNotice"),
            description: <div className="flex items-center justify-start">
              <RouteOff className="mr-5 text-yellow-500"/>{t("profile.success.description405")}
            </div>,
          })
        }
      },
    }))
  }

  const handleForgotPassword = (values: { [key: string]: string }) => {
    if (userSelector.userInfo && userSelector.userInfo.email !== values[t('profile.email')]) {
      toast({
        title: t("profile.error.title"),
        description: <div className="flex items-center justify-start">
          <PencilOff className="mr-5 text-red-500"/>{t("profile.error.descriptionEmailNotMatch")}
        </div>,
      })
    } else {
      handleDispatch(values[t('profile.email')]);
    }
  }
  return (
    <>
    {options.length > 0 && <BoxEdit 
                      options={options}
                      title={t("profile.edit.yourEmail")}
                      labelBtn={t("profile.edit.labelBtnFP")}
                      onSubmit={handleForgotPassword}
                      icon={<span className={cn(`text-base font-medium`, className)}>{t('profile.forgotPassword')}</span>}
                      variantBtn={"link"}
                    />}
    {openVerifyOTP && 
      <OTP 
        openDialog={openVerifyOTP} 
        email={emailVerifyOTP} 
        timeOut={authSelector.otp?.timeOut} 
        resendOTP={handleDispatch}
        handleForward={handleOpenDialogPassword}
      />}
    {openDialogPassword && <EditForgotPassword openDialog={openDialogPassword}/>}
    </>
  )
}

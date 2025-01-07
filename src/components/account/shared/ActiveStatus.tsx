/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorNumber, Status, StatusEnum } from '@/common/general';
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/hooks/use-toast';
import { updateAccount } from '@/store/user/actions';
import { Check, PencilOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

export default function ActiveStatus({ userSelector }: { userSelector: any }) {
  const t = useTranslations('Account');
  const [checked, setChecked] = useState<boolean>(Number(userSelector.status) === Status.Active);
  const [statusValue, setStatusValue] = useState<string>("");
  const dispatch = useDispatch();
  const { toast } = useToast();
  
  useEffect(() => {
    if (userSelector) {
      const status = userSelector.status as keyof typeof StatusEnum;
      const statusValue = StatusEnum[status];
      setStatusValue(statusValue);
      setChecked(Number(userSelector.status) === Status.Active)
    }
  }, [userSelector])

  const handleChange = () => {
    setChecked(!checked)
    dispatch(updateAccount({ 
      data: {
        ...userSelector,
        id: userSelector?.id,
        status: !checked ? `${Status.Active}` : `${Status.Inactive}`
      }, 
      setError: (error) => {
        if(error.status >= ErrorNumber.ErrorCode) {
          toast({
            title: t("profile.error.title"),
            description: <div className="flex items-center justify-start">
              <PencilOff className="mr-5 text-red-500"/>{t("profile.error.descriptionStatus")}
            </div>,
          })
        }
      },
      setSuccess: (success) => {
        if(success.status >= ErrorNumber.Success && success.status < ErrorNumber.Warning) {
          toast({
            title: t("profile.success.title"),
            description: <div className="flex items-center justify-start">
              <Check className="mr-5 text-emerald-500"/>{t("profile.success.descriptionStatus")}
            </div>,
          })
        }
      },
    }))
  }
  return (
    <div className='w-full flex items-center justify-start space-x-5'>
      <span className={`text-base font-normal capitalize ${checked ? "text-emerald-500" : "text-red-500"}`}>
        {statusValue ? t(`profile.${statusValue}`) : t(`profile.nullActive`) }
      </span>
      <Switch checked={checked} onCheckedChange={handleChange}/>
    </div>
  )
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorNumber } from '@/common/general';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { roles } from '@/constant';
import { useToast } from '@/hooks/use-toast';
import { updateAccount } from '@/store/user/actions';
import { Check, PencilOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

export default function ActiveRole({ userSelector }: { userSelector: any }) {
  const t = useTranslations('Account');
  const [defaultValue, setDefaultValue] = useState<string>(userSelector.role);
  const dispatch = useDispatch();
  const { toast } = useToast();

  useEffect(() => {
    if (userSelector) {
      setDefaultValue(userSelector.role);
    }
  }, [userSelector])

  const handleChange = (value: string) => {
    setDefaultValue(value)
    dispatch(updateAccount({ 
      data: {
        ...userSelector,
        id: userSelector?.id,
        role: value,
      }, 
      setError: (error) => {
        if(error.status >= ErrorNumber.ErrorCode) {
          toast({
            title: t("profile.error.title"),
            description: <div className="flex items-center justify-start">
              <PencilOff className="mr-5 text-red-500"/>{t("profile.error.descriptionRole")}
            </div>,
          })
        }
      },
      setSuccess: (success) => {
        if(success.status >= ErrorNumber.Success && success.status < ErrorNumber.Warning) {
          toast({
            title: t("profile.success.title"),
            description: <div className="flex items-center justify-start">
              <Check className="mr-5 text-emerald-500"/>{t("profile.success.descriptionRole")}
            </div>,
          })
        }
      },
    }))
  }
  return (
    <div className='w-full flex items-center justify-start space-x-5'>
      <Select defaultValue={defaultValue} onValueChange={handleChange}>
        <SelectTrigger className="w-max space-x-3 capitalize border-none shadow-none">
          <SelectValue placeholder={defaultValue || t('profile.placeholderSelectRole')}/>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{t('profile.labelSelectRole')}</SelectLabel>
            {roles.map((i, index) => {
              return (
                <SelectItem key={index} value={i.role}>
                  <span className={`text-base font-normal capitalize ${defaultValue === i.role ? "text-emerald-500" : ""}`}>
                    {i.role}
                  </span>
                </SelectItem>
              )
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

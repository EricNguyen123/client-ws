/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorNumber, Status, StatusEnum } from '@/common/general'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ALL, LIMIT, PAGE_INIT } from '@/constant';
import { useToast } from '@/hooks/use-toast';
import { searchUsersPagination } from '@/store/user/actions';
import { offset } from '@/utils';
import { Check, PencilOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react'
import { useDispatch } from 'react-redux';

export default function SelectStatus() {
  const t = useTranslations('Tables');
  const tAccount = useTranslations('Account');
  const dispatch = useDispatch();
  const { toast } = useToast();
  
  const onSelectChange = (value: string) => {
    const data = value !== ALL ? {
      status: value,
      limit: LIMIT,
      offset: offset(PAGE_INIT),
    } : {
      limit: LIMIT,
      offset: offset(PAGE_INIT),
    }
    dispatch(searchUsersPagination({
      data: data,
      setError: (error) => {
        if(error.status >= ErrorNumber.ErrorCode) {
          toast({
            title: tAccount("users.error.title"),
            description: <div className="flex items-center justify-start">
              <PencilOff className="mr-5 text-red-500"/>{tAccount("users.error.description")}
            </div>,
          })
        }
      },
      setSuccess: (success) => {
        if (success.status >= ErrorNumber.Success && success.status < ErrorNumber.Warning) {
          toast({
            title: tAccount("users.success.title"),
            description: <div className="flex items-center justify-start">
              <Check className="mr-5 text-emerald-500"/>{tAccount("users.success.description")}
            </div>,
          })
        }
      },
    }))
  }
  return (
    <Select defaultValue={ALL} onValueChange={onSelectChange}>
      <SelectTrigger className="w-[130px] hover:bg-accent hover:text-accent-foreground">
        <SelectValue placeholder={t('users.status.title')} />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(Status)
                .filter(([key, value]) => typeof value === 'number')
                .map(([key, value], index) => {
                  const status = value as keyof typeof StatusEnum;
                  return (
                    <SelectItem key={index} value={status}>
                      <span className='text-sm font-normal capitalize'>
                        {StatusEnum[status]}
                      </span>
                    </SelectItem>
                  );
                })}
        <SelectItem value={ALL}>
          <span className='text-sm font-normal capitalize'>
            {t('users.status.all')}
          </span>
        </SelectItem>
      </SelectContent>
    </Select>
  )
}

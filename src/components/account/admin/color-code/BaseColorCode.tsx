/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useTranslations } from 'next-intl';
import React, { useState } from 'react'
import ColorPicker from './ColorPicker';
import { Button } from '@/components/ui/button';
import { Check, Loader2, PencilOff } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { createColor } from '@/store/colors/actions';
import { ErrorNumber } from '@/common/general';
import { toast } from '@/hooks/use-toast';
import BaseButtonCopy from '@/components/copy-button/BaseButtonCopy';
import ViewColors from './ViewColors';

export default function BaseColorCode() {
  const t = useTranslations("Account");
  const [color, setColor] = useState("#ff0000");
  const dispatch = useDispatch();
  const colorsSelector = useSelector(({ color }: any) => color);
  const loading = colorsSelector?.loading;
  const [checkSubmit, setCheckSubmit] = useState(false);

  const handleSubmit = () => {
    setCheckSubmit(true);
    dispatch(createColor({
      data: {
        color_code: color,
      },
      setError: (error) => {
        if(error.status >= ErrorNumber.ErrorCode) {
          toast({
            title: t("products.error.title"),
            description: 
            <div className="flex items-center justify-start">
              <PencilOff className="mr-5 text-red-500"/>{t("products.error.description_4")}
            </div>,
          })
        }
      },
      setSuccess: (success) => {
        if (success.status >= ErrorNumber.Success && success.status < ErrorNumber.Warning) {
          setCheckSubmit(false);
          toast({
            title: t("products.success.title"),
            description: 
            <div className="flex items-center justify-start">
              <Check className="mr-5 text-emerald-500"/>{t("products.success.description_1")}
            </div>,
          })
        }
      },
    }))
  }
  
  return (
    <div className='w-full flex flex-col items-start justify-center space-y-10'>
      <div className='w-full flex items-start justify-start flex-col'>
        <span className='text-xl font-bold text-nowrap'>{t("products.color")}</span>
      </div>
      <div className="w-full sm:w-64 h-48 flex flex-col items-start space-y-4">
        <p className="text-lg">{t("products.color_title")}</p>
        <div className='w-full h-12 px-4 flex items-center justify-between border-[1px] rounded-lg'>
          <div className='flex items-center space-x-2'>
            <ColorPicker color={color} onChange={setColor} />
            <span className='font-medium'>{color.toUpperCase()}</span>
          </div>
          <BaseButtonCopy copy={color}/>
        </div>
        <Button 
          variant={'outline'} 
          className='w-full'
          onClick={handleSubmit}
          disabled={loading}
        >
          {checkSubmit && loading && <Loader2 className="animate-spin" />}
          {t("products.button.addColor")}
        </Button>
      </div>
      <div className="w-full flex flex-col items-start space-y-6">
        <div className='w-full flex items-center justify-start'>
          <span className='text-xl font-bold text-nowrap'>{t("products.title_2")}</span>
        </div>
        <div className='w-full flex items-center justify-start'>
          <ViewColors/>
        </div>
      </div>
    </div>
  )
}

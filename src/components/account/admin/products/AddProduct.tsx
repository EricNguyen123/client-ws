/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useTranslations } from 'next-intl';
import React, { useState } from 'react'
import FormProduct from './FormProduct';
import { useDispatch, useSelector } from 'react-redux';
import { Check, PencilOff } from "lucide-react";
import { createProduct } from "@/store/products/actions";
import { toast } from "@/hooks/use-toast";
import { ErrorNumber } from '@/common/general';
import AddImages from './AddImages';
import { Button } from '@/components/ui/button';

export default function AddProduct() {
  const t = useTranslations("Account");
  const dispatch = useDispatch();
  const productsSelector = useSelector(({ product }: any) => product);
  const [addImageCheck, setAddImageCheck] = useState<boolean>(false);

  const handleSubmit = (values: any, handleReset: () => void) => {
    dispatch(createProduct({
      data: {
        name: values.name,
        code: values.code,
        price: values.price,
        quantity: values.quantity,
        quantity_alert: values.quantity_alert,
        order_unit: values.order_unit,
        description: values.description,
        status: values.status,
        multiplication_rate: values.multiplication_rate,
        discount: values.discount,
      },
      setError: (error) => {
        if(error.status >= ErrorNumber.ErrorCode) {
          toast({
            title: t("products.error.title"),
            description: <div className="flex items-center justify-start">
              <PencilOff className="mr-5 text-red-500"/>{t("products.error.description_1")}
            </div>,
          })
        }
      },
      setSuccess: (success) => {
        if (success.status >= ErrorNumber.Success && success.status < ErrorNumber.Warning) {
          toast({
            title: t("products.success.title"),
            description: <div className="flex items-center justify-start">
              <Check className="mr-5 text-emerald-500"/>{t("products.success.description")}
            </div>,
          })
        }
        handleReset();
        setAddImageCheck(true);
      },
    }))
  }
  return (
    <div className='w-full flex flex-col items-start justify-center space-y-10'>
      <div className='w-full flex items-start justify-start flex-col'>
        <span className='text-xl font-bold text-nowrap'>{t("products.addTitle")}</span>
      </div>
      <div className='w-full flex flex-col items-center justify-center space-y-6'>
        <div className='w-full flex items-center justify-start space-x-2'>
          <span className='text-xl font-bold text-nowrap'>{t("products.title_1")}</span>
          {addImageCheck && 
          <div className='text-emerald-500 flex items-center justify-start space-x-2'>
            <Check />
            <Button 
              variant={'link'}
              onClick={() => setAddImageCheck(false)}
            >{t('products.button.addNew')}</Button>
          </div>}
        </div>
        {!addImageCheck &&
        <div className='w-full flex items-center justify-start'>
          <div className='w-full md:w-[80%] lg:w-[60%]'>
            <FormProduct handleSubmit={handleSubmit} loading={productsSelector?.loading}/>
          </div>
        </div>}
      </div>
      {addImageCheck && 
      <div className='w-full flex flex-col items-center justify-center space-y-6'>
        <div className='w-full flex items-center justify-start'>
          <span className='text-xl font-bold text-nowrap'>{t("products.title_2")}</span>
        </div>
        <div className='w-full flex items-center justify-start'>
          <div className='w-full md:w-[80%] lg:w-[60%]'>
            <AddImages/>
          </div>
        </div>     
      </div>}
    </div>
  )
}

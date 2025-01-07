/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from 'react'
import { FormBanners } from './FormBanner'
import { useDispatch, useSelector } from 'react-redux'
import { updateBanner } from '@/store/banners/actions';
import { ErrorNumber } from '@/common/general';
import { toast } from '@/hooks/use-toast';
import { Check, PencilOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function EditBanners({ id, closeDialog }: { id: string, closeDialog?: () => void, }) {
  const dispatch = useDispatch();
  const bannersSelector = useSelector(({ banner } : any) => banner.pages.banners);
  const t = useTranslations("Account");
  const [banner, setBanner] = useState<any>({});

  useEffect(() => {
    if (id) {
      setBanner(bannersSelector.find((item: any) => item.banner.id === id)?.banner);
    }
  }, [id]);

  const handleSubmit = (data: any, handleReset: () => void) => {
    dispatch(updateBanner({
            data: {
              id: id,
              descriptions: data.descriptions,
              orderNumber: data.orderNumber,
              startDate: data.startDate,
              endDate: data.endDate,
            },
            setError: (error) => {
              if(error.status >= ErrorNumber.ErrorCode) {
                toast({
                  title: t("banners.error.title"),
                  description: <div className="flex items-center justify-start">
                    <PencilOff className="mr-5 text-red-500"/>{t("banners.error.description_2")}
                  </div>,
                })
              }
            },
            setSuccess: (success) => {
              if (success.status >= ErrorNumber.Success && success.status < ErrorNumber.Warning) {
                toast({
                  title: t("banners.success.title"),
                  description: <div className="flex items-center justify-start">
                    <Check className="mr-5 text-emerald-500"/>{t("banners.success.description_1")}
                  </div>,
                })
              }
              closeDialog && closeDialog();
              handleReset();
            },
          }))
  }
  return (
    <>
      <DialogHeader>
        <DialogTitle>{t('categories.edit')}</DialogTitle>
      </DialogHeader>
      <FormBanners variant={"edit"} data={banner} handleSubmit={handleSubmit}/>
    </>
  )
}

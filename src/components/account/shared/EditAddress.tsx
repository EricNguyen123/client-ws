/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import BoxInfoItem from './BoxInfoItem';
import { BoxEdit } from './BoxEdit';

import { ErrorNumber } from '@/common/general';
import { useToast } from '@/hooks/use-toast';
import { Check, PencilOff } from 'lucide-react';
import { OptionsBaseInfo } from '@/types';
import { updateAccount } from '@/store/user/actions';

export default function EditAddress({ userSelector }: { userSelector: any }) {
  const t = useTranslations('Account');
  const [optionsAddress, setOptionsAddress] = useState<OptionsBaseInfo[]>([])
  const dispatch = useDispatch();
  const { toast } = useToast()

  useEffect(() => {
    if (userSelector) {
      setOptionsAddress([
        {
          name: t('profile.zipcode'),
          content: userSelector?.zipcode,
          placeholder: t('profile.placeholderZipCode'),
        },
        {
          name: t('profile.phone'),
          content: userSelector?.phone,
          placeholder: t('profile.placeholderPhone'),
        },
        {
          name: t('profile.prefecture'),
          content: userSelector?.prefecture,
          placeholder: t('profile.placeholderPrefecture'),
        },
        {
          name: t('profile.city'),
          content: userSelector?.city,
          placeholder: t('profile.placeholderCity'),
        },
        {
          name: t('profile.street'),
          content: userSelector?.street,
          placeholder: t('profile.placeholderStreet'),
        },
        {
          name: t('profile.building'),
          content: userSelector?.building,
          placeholder: t('profile.placeholderBuilding'),
        }
      ])
    }
  }, [userSelector, t])

  const handleChangesAddressEdit = (values: { [key: string]: string }) => {
    dispatch(updateAccount({ 
      data: {
        ...userSelector,
        id: userSelector?.id,
        zipcode: values[t('profile.zipcode')],
        phone: values[t('profile.phone')],
        prefecture: values[t('profile.prefecture')],
        city: values[t('profile.city')],
        street: values[t('profile.street')],
        building: values[t('profile.building')],
      }, 
      setError: (error) => {
        if(error.status >= ErrorNumber.ErrorCode) {
          toast({
            title: t("profile.error.title"),
            description: <div className="flex items-center justify-start">
              <PencilOff className="mr-5 text-red-500"/>{t("profile.error.descriptionEditAddress")}
            </div>,
          })
        }
      },
      setSuccess: (success) => {
        if(success.status >= ErrorNumber.Success && success.status < ErrorNumber.Warning) {
          toast({
            title: t("profile.success.title"),
            description: <div className="flex items-center justify-start">
              <Check className="mr-5 text-emerald-500"/>{t("profile.success.descriptionEditAddress")}
            </div>,
          })
        }
      },
    }))
  }

  const editAddressComponent = optionsAddress.length > 0 && <BoxEdit 
                        options={optionsAddress}
                        title={t("profile.edit.editAddress")}
                        labelBtn={t("profile.edit.labelBtn")}
                        onSubmit={handleChangesAddressEdit}
                      />

  return (
    <BoxInfoItem 
          editComponent={editAddressComponent} 
          options={optionsAddress} 
          title={t("profile.titleBox.subheaderAddress")}/>
  )
}

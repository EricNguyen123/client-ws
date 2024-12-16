/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import SelectStatus from './SelectStatus'
import BaseButton from '@/components/float-button/BaseButton'
import moreTableUsers from '@/constant/more-table-users'
import BaseButtonDelete from '@/components/delete/BaseButtonDelete';
import { columnsKey } from '@/constant/columns';
import { useDispatch } from 'react-redux';
import { deleteUsers } from '@/store/user/actions';
import { Check, PencilOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ErrorNumber } from '@/common/general';
import { useTranslations } from 'next-intl';
import DialogDelete from '@/components/delete/DialogDelete';
import { UserProps } from '@/types';

export interface FeatureTableProps {
  handle?: (i?: any) => void;
  result?: (i?: any, e?: (x?: any) => void) => void;
  data: UserProps[];
}

export default function FeatureTable({ handle, result, data }: FeatureTableProps) {
  const [openHandle, setOpenHandle] = useState<boolean>(false)
  const dispatch = useDispatch()
  const { toast } = useToast();
  const t = useTranslations('Tables');
  const [openComfirm, setOpenComfirm] = useState<boolean>(false);

  const handleDelete = (i: any) => {
    const ids = Object.keys(i).map((key) => { return { id: data[Number(key)].id }})
    if (!ids.length) {
      return toast({
        title: t("users.delete.warning.title"),
        description: <div className="flex items-center justify-start">
          <PencilOff className="mr-5 text-emerald-500"/>{t("users.delete.warning.description")}
        </div>,
      })
    }
    dispatch(deleteUsers({
      data: ids,
      setError: (error) => {
        if(error.status >= ErrorNumber.ErrorCode) {
          toast({
            title: t("users.delete.error.title"),
            description: <div className="flex items-center justify-start">
              <PencilOff className="mr-5 text-red-500"/>{t("users.delete.error.description")}
            </div>,
          })
        }
      },
      setSuccess: (success) => {
        if (success.status >= ErrorNumber.Success && success.status < ErrorNumber.Warning) {
          toast({
            title: t("users.delete.success.title"),
            description: <div className="flex items-center justify-start">
              <Check className="mr-5 text-emerald-500"/>{t("users.delete.success.description")}
            </div>,
          })
        }
      }
    }))
  }

  const handleConfirmDelete = () => {
    setOpenComfirm(false)
    setOpenHandle(false)
    result && result({ [columnsKey.select]: false }, handleDelete)
  }

  const handleClickCancel = () => {
    setOpenHandle(false)
    result && result({ [columnsKey.select]: false })
  }

  const handleClickDelete = () => {
    setOpenComfirm(true)
  }

  return (
    <>
      {openHandle && 
      <>
      <BaseButtonDelete 
        variant={"circle"}
        handleCancel={handleClickCancel}
        handleDelete={handleClickDelete}
      />
      <DialogDelete 
        open={openComfirm} 
        setOpen={setOpenComfirm} 
        handle={handleConfirmDelete}
        title={t('users.delete.title')}
        content={t('users.delete.confirm')}
      />
      </>}
      <BaseButton 
        options={moreTableUsers()} 
        handle={(i: any) => {
          setOpenHandle(true)
          handle && handle(i)
        }}/>
      <SelectStatus/>
    </>
  )
}

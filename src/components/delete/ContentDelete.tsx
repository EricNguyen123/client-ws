/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'
import BaseButtonDelete from './BaseButtonDelete'
import { useTranslations } from 'next-intl';

export interface ContentDeleteProps {
  closeDialog?: () => void,
  handle?: (i?: any) => void,
  title?: React.ReactNode,
  content?: React.ReactNode,
}

export default function ContentDelete({ closeDialog, handle, title, content }: ContentDeleteProps) {
  const t = useTranslations('Delete');
  return (
    <>
      <DialogHeader>
        <DialogTitle className='text-xl font-semibold'>{title || t('title')}</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>
      <div className='w-full flex flex-col items-center justify-center space-y-10'>
        <div className='w-full'>
          {`${t('description')} ${ content || ""} ${t('description_1')}`}
        </div>
        <BaseButtonDelete
          handleCancel={() => closeDialog && closeDialog()}
          handleDelete={() => handle && handle(()=>{closeDialog && closeDialog()})}
        />
      </div>
    </>
  )
}

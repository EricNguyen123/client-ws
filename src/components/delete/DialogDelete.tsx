/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
'use client'

import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import ContentDelete from './ContentDelete';

export interface DialogDeleteProps {
  open?: boolean,
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>,
  handle?: (i?: any) => void,
  title?: React.ReactNode,
  content?: React.ReactNode,
  trigger?: React.ReactNode,
}

export default function DialogDelete({ open = false, setOpen, handle, title, content, trigger }: DialogDeleteProps) {
  const [openChange, setOpenChange] = useState<boolean>(open);
  const handleOpen = (i: boolean) => {
    setOpenChange(i)
    setOpen && setOpen(i)
  }

  useEffect(() => {
    setOpenChange(open);
  }, [open]);

  return (
    <Dialog open={openChange} onOpenChange={handleOpen}>
      {trigger && 
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>}
      <DialogContent>
        {/* <DialogHeader>
          <DialogTitle className='text-xl font-semibold'>{title || t('title')}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className='w-full flex flex-col items-center justify-center space-y-10'>
          <div className='w-full'>
            {`${t('description')} ${ content || ""} ${t('description_1')}`}
          </div>
          <BaseButtonDelete
            handleCancel={() => handleOpen(false)}
            handleDelete={handle}
          />
        </div> */}
        <ContentDelete handle={handle} title={title} content={content} closeDialog={() => {handleOpen(false)}}/>
      </DialogContent>
    </Dialog>
  )
}

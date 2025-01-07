/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorNumber } from '@/common/general';
import DialogDelete from '@/components/delete/DialogDelete'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast';
import { updateCategories } from '@/store/categories/actions';
import { Check, Minus, PencilOff } from 'lucide-react'
import { useTranslations } from 'next-intl';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

export default function ChangeParent({ id }: { id: string }) {
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const t = useTranslations('Account');
  const { toast } = useToast();
  
  const handle = () => {
    
    dispatch(updateCategories({
      data: {
        id: id,
        data: {
          name: '',
          parentCategoryId: '',
          subCategoryIds: [],
        }
      },
      setError: (error: any) => {
        if(error.status >= ErrorNumber.ErrorCode) {
          toast({
            title: t("categories.error.title"),
            description: <div className="flex items-center justify-start">
              <PencilOff className="mr-5 text-red-500"/>{t("categories.delete.error.description_2")}
            </div>,
          })
        }
      },
      setSuccess: (success: any) => {
        setOpen(false);
        if (success.status >= ErrorNumber.Success && success.status < ErrorNumber.Warning) {
          toast({
            title: t("categories.success.title"),
            description: <div className="flex items-center justify-start">
              <Check className="mr-5 text-emerald-500"/>{t("categories.delete.success.description_2")}
            </div>,
          })
        }
      }
    }))
  }
  return (
    <DialogDelete
      open={open}
      setOpen={setOpen}
      title={t("categories.delete.title_2")}
      content={t("categories.delete.confirm_2")}
      handle={handle}
      trigger={
        <Button 
          variant={"outline"} 
          className='hover:bg-rose-500 hover:text-white rounded-full w-9 h-9'>
          <Minus />
        </Button>}
    />
    
  )
}

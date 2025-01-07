/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import React, { useEffect, useState } from 'react'
import BoxSeclect, { DataBoxSeclector } from './BoxSeclect'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslations } from 'next-intl'
import { useToast } from '@/hooks/use-toast'
import { ErrorNumber } from '@/common/general'
import { Check, PencilOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { updateCategories } from '@/store/categories/actions'

export default function EditCategories({ idItem, closeDialog }: {
  idItem?: string,
  closeDialog?: () => void,
}) {
  const categorySelector = useSelector(({ category } : any) => category.categories);
  const [nameValue, setNameValue] = useState<string>('');
  const [childrenCategories, setChildrenCategories] = useState<DataBoxSeclector[]>([]);
  const [idItemCategories, setIdItemCategories] = useState<string[]>([]);
  const [idChildrenCategories, setIdChildrenCategories] = useState<string[]>([]);
  const dispatch = useDispatch();
  const t = useTranslations('Account');
  const { toast } = useToast();
  
  const filterCategories = (data: any) => {
    const result: DataBoxSeclector[] = [];
    data.forEach((item: any) => {
      result.push(item)
      if (item.subCategories.length > 0) {
        const e = filterCategories(item.subCategories)
        result.push(...e)
      }
    })
    return result;
  }

  const checkRootCategories = (data: any[], id: string): string[] => {
    const result: string[] = [];
  
    for (const item of data) {
      result.push(item.id);
      if (item.id === id) {
        return result;
      }
      if (item.subCategories && item.subCategories.length > 0) {
        const subResult = checkRootCategories(item.subCategories, id);

        if (subResult.length > 0) {
          return result.concat(subResult);
        }
      }
  
      result.pop();
    }
  
    return [];
  };

  useEffect(() => {
    const idParent = filterCategories(categorySelector)
                      .filter((item: any) => item.id === idItem)[0].parentCategory?.id;
    setIdItemCategories(idParent ? [idParent] : [])
    if (categorySelector) {
      const resItem = (i: any) => {
        const res: any[] = [];
        i.forEach((item: any) => {
          if (item.id === idItem) {
            res.push(item);
          } else {
            res.push(...resItem(item.subCategories));
          }
        })
        return res;
      }
      setNameValue(resItem(categorySelector)[0]?.name);
      setChildrenCategories(categorySelector.filter((item: any) => 
        !item.parentCategory && 
        !checkRootCategories(categorySelector, idParent).includes(item.id) &&
        idItem && !checkRootCategories(categorySelector, idItem).includes(item.id)
      ))
    }
  }, [categorySelector, idItemCategories[0], idChildrenCategories])

  const handleChildrenCategories = (i: any) => {
    setIdChildrenCategories(i);
  }
  
  const handleSubmit = () => {
    if (nameValue.trim() !== "" && idItem) {
      dispatch(updateCategories({
        data: {
          id: idItem,
          data: {
            name: nameValue,
            parentCategoryId: idItemCategories[0],
            subCategoryIds: idChildrenCategories,
          }
        },
        setError: (error: any) => {
          if(error.status >= ErrorNumber.ErrorCode) {
            toast({
              title: t("categories.error.title"),
              description: <div className="flex items-center justify-start">
                <PencilOff className="mr-5 text-red-500"/>{t("categories.error.description_2")}
              </div>,
            })
          }
        },
        setSuccess: (success: any) => {
          setNameValue('');
          setIdItemCategories([]);
          setIdChildrenCategories([]);
          closeDialog && closeDialog();
          if (success.status >= ErrorNumber.Success && success.status < ErrorNumber.Warning) {
            toast({
              title: t("categories.success.title"),
              description: <div className="flex items-center justify-start">
                <Check className="mr-5 text-emerald-500"/>{t("categories.success.description_1")}
              </div>,
            })
          }
        }
      }))
    } else {
      toast({
        title: t("categories.warning.title"),
        description: <div className="flex items-center justify-start">
          <PencilOff className="mr-5 text-yellow-500"/>{t("categories.warning.description")}
        </div>,
      })
    }
  }
  return (
    <>
        <DialogHeader>
          <DialogTitle>{t('categories.edit')}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="w-full flex flex-col items-center justify-center space-y-2 mb-6">
            <Label htmlFor="name" className="w-full text-left xl:text-nowrap">
              {t('categories.newName')}
            </Label>
            <Input 
              id="name" 
              value={nameValue}
              onChange={(e: any) => {setNameValue(e.target.value)}} 
              className="w-full" 
              placeholder={t('categories.placeholderNewName')}/>
          </div>
          <Separator className='w-full'/>
          <div className={`w-full items-center ${idItem ? 'flex justify-center' : 'grid grid-cols-2 gap-6'}`}>
            <div className='w-full h-[260px] flex flex-col items-center justify-start space-y-1'>
                <BoxSeclect
                title={t('categories.titleChild')} 
                searchPlaceholder={t('categories.placeholderSearch')}
                data={childrenCategories}
                onChange={handleChildrenCategories}/>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button className='w-full' type="submit" onClick={() => {handleSubmit()}}>
            {t('categories.btnSave')}
          </Button>
        </DialogFooter>
    </>
  )
}

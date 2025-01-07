/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'
import BoxSeclect, { DataBoxSeclector } from './BoxSeclect'
import { useDispatch, useSelector } from 'react-redux'
import { Separator } from '@/components/ui/separator'
import { createCategories } from '@/store/categories/actions'
import { useTranslations } from 'next-intl'
import { ErrorNumber } from '@/common/general'
import { useToast } from '@/hooks/use-toast'
import { Check, FilePlus, PencilOff } from 'lucide-react'

export default function AddCategories({ idParent, variant = 'default' }: {
  idParent?: string,
  variant?: "default" | "icon",
}) {
  const categorySelector = useSelector(({ category } : any) => category.categories);
  const [nameValue, setNameValue] = useState<string>('');
  const [parentCategories, setParentCategories] = useState<DataBoxSeclector[]>([]);
  const [childrenCategories, setChildrenCategories] = useState<DataBoxSeclector[]>([]);
  const [idParentCategories, setIdParentCategories] = useState<string[]>(idParent ? [idParent] : []);
  const [idChildrenCategories, setIdChildrenCategories] = useState<string[]>([]);
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
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

  const checkChildrenCategories = (data: any[], id: string): boolean => {
    const x: string[] = checkRootCategories(data, id);
    return idChildrenCategories.includes(x[0]);
  }

  useEffect(() => {
    if (categorySelector) {
      setParentCategories(filterCategories(categorySelector)
        .filter((item: any) => !checkChildrenCategories(categorySelector, item.id)));
      setChildrenCategories(categorySelector.filter((item: any) => 
        !item.parentCategory && 
        !checkRootCategories(categorySelector, idParentCategories[0]).includes(item.id)))
    }
  }, [categorySelector, idParentCategories[0], idChildrenCategories])

  const handleParentCategories = (i: any) => {
    setIdParentCategories(i);
  }

  const handleChildrenCategories = (i: any) => {
    setIdChildrenCategories(i);
  }

  const handleSubmit = () => {
    if (nameValue.trim() !== "") {
      dispatch(createCategories({
        data: {
          name: nameValue,
          parentCategoryId: idParentCategories[0],
          subCategoryIds: idChildrenCategories,
        },
        setError: (error: any) => {
          if(error.status >= ErrorNumber.ErrorCode) {
            toast({
              title: t("categories.error.title"),
              description: <div className="flex items-center justify-start">
                <PencilOff className="mr-5 text-red-500"/>{t("categories.error.description_1")}
              </div>,
            })
          }
        },
        setSuccess: (success: any) => {
          setOpenDialog(false);
          setNameValue('');
          setIdParentCategories(idParent ? [idParent] : []);
          setIdChildrenCategories([]);
          if (success.status >= ErrorNumber.Success && success.status < ErrorNumber.Warning) {
            toast({
              title: t("categories.success.title"),
              description: <div className="flex items-center justify-start">
                <Check className="mr-5 text-emerald-500"/>{t("categories.success.description")}
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
    <Dialog open={openDialog} onOpenChange={(e) => {setOpenDialog(e)}}>
      <DialogTrigger asChild>
        {variant === 'icon' ? 
        <Button variant={"outline"} className='!p-2 w-9 rounded-full'><FilePlus /></Button> : 
        <Button variant={"outline"} className='w-28'>{t('categories.btnAdd')}</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>{t('categories.add')}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="w-full flex flex-col items-center justify-center space-y-2 mb-6">
            <Label htmlFor="name" className="w-full text-left xl:text-nowrap">
              {t('categories.name')}
            </Label>
            <Input 
              id="name" 
              value={nameValue}
              onChange={(e: any) => {setNameValue(e.target.value)}} 
              className="w-full" 
              placeholder={t('categories.placeholderName')}/>
          </div>
          <Separator className='w-full'/>
          <div className={`w-full items-center ${idParent ? 'flex justify-center' : 'grid grid-cols-2 gap-6'}`}>
            {!idParent && <div className='w-full h-[260px] flex flex-col items-center justify-start space-y-1'>
                <BoxSeclect 
                  option={"single"}
                  title={t('categories.titleParent')}
                  searchPlaceholder={t('categories.placeholderSearch')}
                  data={parentCategories}
                  onChange={handleParentCategories}
                />
            </div>}
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
      </DialogContent>
    </Dialog>
  )
}

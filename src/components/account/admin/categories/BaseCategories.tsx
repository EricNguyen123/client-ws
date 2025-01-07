/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useEffect, useState } from 'react'
import AddCategories from './AddCategories'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from '@/store/categories/actions';
import { useToast } from '@/hooks/use-toast';
import { useTranslations } from 'next-intl';
import { Check, PencilOff } from 'lucide-react';
import { ErrorNumber } from '@/common/general';
import BaseSearch from '@/components/search-form/BaseSearch';
import ViewTree, { dataViewTree } from './ViewTree';
import { LIMIT, PAGE_INIT } from '@/constant';
import { calculateTotalPages, offset } from '@/utils';
import { BasePagination } from '@/components/pagination/BasePagination';
import NoData from '@/components/NoData';

export default function BaseCategories() {
  const dispatch = useDispatch();
  const { toast } = useToast()
  const t = useTranslations('Account');
  const categoryPagesSelector = useSelector(({ category } : any) => category.pages);
  const categorySelector = useSelector(({ category } : any) => category.categories);
  const [dataIn, setDataIn] = useState<dataViewTree[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(PAGE_INIT);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [keySearch, setKeySearch] = useState<string>("");
  
  const getPageCategories = (page: number, keyword?: string) => {
    const data = keyword && keyword.trim() !== "" ? {
      keyword: keyword,
      limit: LIMIT,
      offset: offset(page),
    } : {
      limit: LIMIT,
      offset: offset(page),
    }
    dispatch(getCategories({
      data: data,
      setError: (error) => {
        if(error.status >= ErrorNumber.ErrorCode) {
          toast({
            title: t("categories.error.title"),
            description: <div className="flex items-center justify-start">
              <PencilOff className="mr-5 text-red-500"/>{t("categories.error.description")}
            </div>,
          })
        }
      },
      setSuccess: (success) => {
        if (!keyword && success.status >= ErrorNumber.Success && success.status < ErrorNumber.Warning) {
          toast({
            title: t("categories.success.title"),
            description: <div className="flex items-center justify-start">
              <Check className="mr-5 text-emerald-500"/>{t("categories.success.description_3")}
            </div>,
          })
        }
      },
    }))
  }
  useEffect(() => {
    if (categoryPagesSelector.categories) {
      setDataIn(handleSub(categoryPagesSelector.categories))
      setCurrentPage(categoryPagesSelector.currentPage)
      }
    else {
      getPageCategories(currentPage)
    }
    setTotalPages(calculateTotalPages(categorySelector?.length, LIMIT))
  }, [categoryPagesSelector])

  const handleSub = (data: any) => {
    return data && data.map((i: any) => {
      return {
        id: i.id,
        name: i.name,
        sub: handleSub(i.subCategories),
      }
    })
  }

  const handleSearch = (value: string) => {
    setKeySearch(value)
    setCurrentPage(PAGE_INIT)
    getPageCategories(PAGE_INIT, value)
  }

  const handlePageChange = (page: number) => {
    if (keySearch.trim() !== "") {
      getPageCategories(page, keySearch)
    } else {
      getPageCategories(page)
    }
  }

  return (
    <div className='w-full flex flex-col items-start justify-center space-y-10'>
      <div className='w-full flex items-start justify-start flex-col'>
        <span className='text-xl font-bold'>{t('categories.title')}</span>
      </div>
      <div className='w-full flex items-center justify-between space-x-2'>
        <BaseSearch placeholder={t('categories.placeholderSearch')} onChange={handleSearch}/>
        <AddCategories/>
      </div>
      <div className='w-full'>
        {dataIn.length > 0 ? 
          <ViewTree data={dataIn}/>:
          <NoData width='35' height='35'/>}
        {totalPages > 1 && 
                <BasePagination pages={totalPages} chagneData={handlePageChange} currentPage={currentPage}/>}
      </div>
    </div>
  )
}

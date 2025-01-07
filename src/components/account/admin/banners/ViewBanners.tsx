/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { ErrorNumber } from '@/common/general';
import { BasePagination } from '@/components/pagination/BasePagination';
import { DEFAULT_IMAGE_URL, LIMIT, PAGE_INIT } from '@/constant';
import { toast } from '@/hooks/use-toast';
import { getPageBanner } from '@/store/banners/actions';
import { calculateTotalPages, numbering, offset } from '@/utils';
import { CalendarDays, Check, PencilOff } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Image from "next/image";
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { format } from 'date-fns';
import { useTranslations } from 'next-intl';
import ActionsBanners from './ActionsBanners';
import CardView from '../../shared/CardView';

export default function ViewBanners({ search }: { search: string }) {
  const bannersSelector = useSelector(({ banner } : any) => banner.pages);
  const [currentPage, setCurrentPage] = useState<number>(PAGE_INIT);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [keySearch, setKeySearch] = useState<string>("");
  const [dataIn, setDataIn] = useState<any[]>([]);
  const dispatch = useDispatch();
  const t = useTranslations("Account");

  const getPageCategories = (page: number, keyword?: string) => {
    const data = keyword && keyword.trim() !== "" ? {
      keyword: keyword,
      limit: LIMIT,
      offset: offset(page),
    } : {
      limit: LIMIT,
      offset: offset(page),
    }
    dispatch(getPageBanner({
      data: data,
      setError: (error) => {
        if(error.status >= ErrorNumber.ErrorCode) {
          toast({
            title: t("banners.error.title"),
            description: <div className="flex items-center justify-start">
              <PencilOff className="mr-5 text-red-500"/>{t("banners.error.description")}
            </div>,
          })
        }
      },
      setSuccess: (success) => {
        if (!keyword && success.status >= ErrorNumber.Success && success.status < ErrorNumber.Warning) {
          toast({
            title: t("banners.success.title"),
            description: <div className="flex items-center justify-start">
              <Check className="mr-5 text-emerald-500"/>{t("banners.success.description_3")}
            </div>,
          })
        }
      },
    }))
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
  
  useEffect(() => {
    handleSearch(search)
  }, [search])

  useEffect(() => {
    if (bannersSelector.banners) {
      setDataIn(bannersSelector.banners)
      setCurrentPage(bannersSelector.currentPage)
    }
    else {
      getPageCategories(currentPage)
    }
    setTotalPages(calculateTotalPages(bannersSelector.totalBanners, LIMIT))
  }, [bannersSelector])

  return (
    <div className='w-full'>
      {dataIn.length > 0 && 
        <div className='w-full flex flex-col items-center justify-center space-y-4'>
          {dataIn.map((data, index) => 
            <Card key={index} className='w-full !p-0'>
              <CardHeader className='w-full !p-2 !pb-0 flex flex-row space-y-0 items-center justify-between'>
                <span className='font-semibold px-3'>{numbering(currentPage, index)}</span>
                <ActionsBanners data={data}/>
              </CardHeader>
              <CardContent className='w-full !p-2'>
                <div 
                  className='grid grid-cols-1 grid-rows-3 gap-8 
                              lg:grid-cols-3 lg:grid-rows-1 lg:gap-4'
                >
                  <div className="w-full flex items-center justify-center">
                    <div className='w-full h-full flex items-center justify-center 
                                    rounded-lg border-[1px] border-accent shadow-sm'>
                      <div className="w-full h-full relative flex items-center justify-center p-2">
                        <Image
                          src={data.banner.url}
                          alt="Preview"
                          layout="fill"
                          objectFit="cover"
                          className="rounded-lg border"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = DEFAULT_IMAGE_URL;
                          }}
                          unoptimized
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-full">
                    <CardView 
                      title={t('banners.desciptions')}
                      content={data.banner.descriptions}
                      isScroll={true}
                    />
                  </div>
                  <div className="w-full flex flex-col space-y-2">
                    <CardView 
                      title={t('banners.numberOrder')}
                      content={data.banner.number_order}
                    />

                    <div className="grid lg:grid-rows-2 xl:grid-rows-1 xl:grid-cols-2 gap-2 flex-1">
                      <CardView 
                        title={<>
                          <CalendarDays className='w-4 h-4'/>
                          <span>{t('banners.startDate')}</span>
                        </>}
                        content={format(data.banner.start_date, "PP")}
                      />
                      <CardView 
                        title={<>
                          <CalendarDays className='w-4 h-4'/>
                          <span>{t('banners.endDate')}</span>
                        </>}
                        content={format(data.banner.end_date, "PP")}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      }
      {totalPages > 1 && 
        <BasePagination pages={totalPages} chagneData={handlePageChange} currentPage={currentPage}/>}
    </div>
  )
}

'use client'

import BaseSearch from '@/components/search-form/BaseSearch'
import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import BoxButton from '@/components/BoxButton'
import ViewBanners from './ViewBanners'
import { useTranslations } from 'next-intl'
import AddBanners from './AddBanners'

export default function BaseBanners() {
  const [search, setSearch] = useState<string>("");
  const t = useTranslations("Account");
  
  const handleSearch = (value: string) => {
    setSearch(value)
  }

  return (
    <div className='w-full flex flex-col items-start justify-center space-y-10'>
      <div className='w-full flex items-start justify-start flex-col'>
        <span className='text-xl font-bold text-nowrap'>{t("banners.title")}</span>
      </div>
      <div className='w-full flex flex-col items-center justify-center space-y-6'>
        <div className='w-full flex items-center justify-start'>
          <span className='text-xl font-bold text-nowrap'>{t("banners.title_1")}</span>
        </div>
        <div className='w-full flex items-center justify-start'>
          <BoxButton 
            render={(handle) => {
              return (<Card className='w-full !p-0'>
                <CardContent className='w-full !px-4 !py-8'>
                  <AddBanners handle={handle}/>
                </CardContent>
              </Card>)
            }}
          />
        </div>        
      </div>
      <div className='w-full flex flex-col items-center justify-center space-y-6'>
        <div className='w-full flex flex-row items-center justify-between space-x-6'>
          <span className='text-xl font-bold text-nowrap'>{t("banners.title_4")}</span>
          <BaseSearch onChange={handleSearch} placeholder={t("banners.placeholderSearch")}/>
        </div>
        <ViewBanners search={search}/>
      </div>
    </div>
  )
}

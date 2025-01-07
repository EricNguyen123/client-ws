/* eslint-disable @typescript-eslint/no-explicit-any */
import BaseButton from '@/components/float-button/BaseButton'
import actionsBanners from '@/constant/actions-banners'
import React from 'react'

export default function ActionsBanners({ data }: { data: any }) {
  return (
    <BaseButton 
      variant="horizontal" 
      options={actionsBanners(data.banner.id)}
    />
  )
}

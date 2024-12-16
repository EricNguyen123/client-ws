/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Card, CardContent } from '@/components/ui/card'
import React, { useEffect, useState } from 'react'
import { BaseChart } from '../../shared/BaseChart'
import { useSelector } from 'react-redux'
import { chartConfig, chartConfigSubscribers, chartConfigVisiter } from '@/constant/chart-config'
import { chartData, chartDataSubscribers, chartDataVisiter } from '@/constant/chart-data'
import { ChartDataProps } from '@/types'
import { useTranslations } from 'next-intl'
import { dataKey, nameKey } from '@/constant/key'

export default function Statistical() {
  const t = useTranslations('Charts');
  const userSelector = useSelector(({ user } : any) => user);
  const [allUsers, setAllUsers] = useState<number>(0);
  const [chartDataActive, setChartDataActive] = useState<ChartDataProps>();
  const [chartDataVisited, setChartDataVisited] = useState<ChartDataProps>();
  const [chartDataSubscriber, setChartDataSubscriber] = useState<ChartDataProps>();
  const chartConfigActive = chartConfig && chartConfig();
  const chartConfigVisited = chartConfigVisiter && chartConfigVisiter();
  const chartConfigSubscriber = chartConfigSubscribers && chartConfigSubscribers();
  const [checkChart, setCheckChart] = useState<boolean>(true);

  useEffect(() => {
    if (userSelector.statistical) {
      setAllUsers(userSelector.statistical.totalUsers)
      setChartDataActive(chartData(userSelector.statistical))
      setChartDataVisited(chartDataVisiter(userSelector.statistical))
      setChartDataSubscriber(chartDataSubscribers(userSelector.statistical))
    }
    if (userSelector.statistical?.totalUsers !== undefined && !userSelector.statistical.totalUsers) {
      setCheckChart(false);
    }
  }, [userSelector.statistical])

  
  return (
    <Card className='h-full flex items-center'>
      <CardContent className='w-full !pb-0'>
        {checkChart ? 
        <div className='w-full flex items-center justify-between h-full flex-col sm:flex-row'>
          {chartDataActive && chartConfigActive && 
            <BaseChart 
              chartConfig={chartConfigActive} 
              chartData={chartDataActive} 
              total={allUsers} 
              title={t('title')}
              inDataKey={dataKey.users} 
              inNameKey={nameKey.activer}/>}
          {chartDataVisited && chartConfigVisited && 
            <BaseChart 
              chartConfig={chartConfigVisited} 
              chartData={chartDataVisited} 
              total={allUsers} 
              title={t('title')} 
              inDataKey={dataKey.users} 
              inNameKey={nameKey.visiter}/>}
          {chartDataSubscriber && chartConfigSubscriber && 
            <BaseChart 
              chartConfig={chartConfigSubscriber} 
              chartData={chartDataSubscriber} 
              total={allUsers} 
              title={t('title')}
              inDataKey={dataKey.users} 
              inNameKey={nameKey.subscribers}/>}
        </div> : 
        <div className='w-full h-full flex items-center justify-center text-base font-normal text-gray-400'>{t('noResults')}</div>}
        
      </CardContent>
    </Card>
  )
}

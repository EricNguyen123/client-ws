/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import NoData from '@/components/NoData';
import BaseSearch from '@/components/search-form/BaseSearch'
import { Checkbox } from '@/components/ui/checkbox'
import React from 'react'

export interface DataBoxSeclector {
  id: string | number;
  name?: string;
  [key: string]: any;
}

export interface BoxSeclectProps {
  onChange?: (i: any) => void;
  defaultValue?: string[];
  title?: string;
  data?: DataBoxSeclector[];
  searchPlaceholder?: string;
  option?: 'single' | 'multiple';
}

export default function BoxSeclect({ defaultValue, onChange, title, data, searchPlaceholder, option = 'multiple' } : BoxSeclectProps) {
  const [checked, setChecked] = React.useState<string[]>(defaultValue || [])
  const [dataBox, setDataBox] = React.useState<DataBoxSeclector[] | undefined>(data)
  React.useEffect(() => {
    onChange && onChange(checked)
  }, [checked])
  React.useEffect(() => {
    setDataBox(data)
  },[data])

  const handleSearch = (searchValue: string) => {
    if (searchValue && searchValue.trim() !== "") {
      const result = data?.filter((item: any) => 
        Object.entries(item).some(([key, value]) => 
          key === 'name' &&
          String(value).toLowerCase().includes(searchValue.trim().toLowerCase())
        )
      );
      result && result.length > 0 ? setDataBox(result) : setDataBox(undefined)
    } else {
      setDataBox(data);
    }
  }
  
  return (
    <div className='w-full h-full flex flex-col items-center justify-start space-y-2 p-2'>
      <span className='w-full h-9 p-2'>{title}</span>
      <div className='w-full flex items-center justify-center p-2'>
        <BaseSearch placeholder={searchPlaceholder} size={"auto"} onChange={handleSearch}/>
      </div>
      <div className='w-full max-h-[280px] flex flex-col items-center justify-start overflow-scroll scrollbar-no-hover-bg p-2'>
        <div className='w-full h-max flex flex-col items-center justify-start space-y-1'>
          {dataBox && dataBox.map((item: any, index: any) => (
            <div key={index} className='w-full flex flex-row items-center justify-start space-x-2'>
              <Checkbox 
                checked={checked.includes(`${item.id}`)}
                onCheckedChange={(e) => {
                  return e ? 
                    option === 'single' ?
                    setChecked([`${item.id}`])
                    : setChecked([...checked, `${item.id}`]) 
                    : setChecked(checked.filter((i) => i !== `${item.id}`))
                }}
              />
              <span className='text-sm capitalize font-normal'>
                {item.name}
              </span>
            </div>
          ))}
          {(!dataBox || dataBox.length === 0) && 
          <div className='w-full flex items-center justify-center'>
            <span className='text-gray-400'>
              <NoData width='35' height='35'/>
            </span>
          </div>}
        </div>
      </div>
    </div>
  )
}

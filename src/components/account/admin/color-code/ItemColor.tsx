/* eslint-disable react-hooks/exhaustive-deps */
import BaseButtonCopy from '@/components/copy-button/BaseButtonCopy'
import BaseButton from '@/components/float-button/BaseButton';
import { TIME_OUT_INTERVAL } from '@/constant';
import actionsColors from '@/constant/actions-colors';
import { isNewItem } from '@/utils';
import { Dot } from 'lucide-react'
import React, { useEffect, useState } from 'react'

export default function ItemColor({ color, date, id }: { color: string, date?: string, id: string }) {
  const [isNew, setIsNew] = useState<boolean>(false);

  useEffect(() => {
    if (date) {
      setIsNew(isNewItem(date))
      const timeout = setTimeout(() => {
        setIsNew(false);
      }, TIME_OUT_INTERVAL * 60 * 1000);

      return () => clearTimeout(timeout);
    }
  }, [date])

  return (
      <div className="w-full h-12 flex flex-col items-start space-y-4 relative">
        <div className='w-full h-12 px-4 flex items-center justify-between border-[1px] rounded-lg'>
          <div className='flex items-center space-x-2'>
            <div className='w-6 h-6 border-[1px] rounded-md' style={{ backgroundColor: color }}></div>
            <span className='font-medium'>{color.toUpperCase()}</span>
          </div>
          <div className='flex items-center space-x-1'>
            <BaseButtonCopy copy={color}/>
            <BaseButton variant={'horizontal'} options={actionsColors(id)}/>
          </div>
        </div>
        {isNew && 
        <div className='absolute top-[-6px] left-[-10px] transform -translate-y-1/2 text-emerald-500'>
          <Dot className='w-10 h-10'/>  
        </div>}
      </div>
  )
}

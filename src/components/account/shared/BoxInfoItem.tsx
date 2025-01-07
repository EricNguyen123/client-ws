/* eslint-disable @typescript-eslint/no-explicit-any */
import { Separator } from '@/components/ui/separator'
import React from 'react'
import { cn } from '@/lib/utils';
import { symbols } from '@/constant';

type BoxInfoItemProps = {
  options: { [key: string]: any }[];
  title?: React.ReactNode;
  className?: string;
  editComponent?: React.ReactNode;
  deleteComponent?: React.ReactNode;
}

export default function BoxInfoItem({ 
  options, 
  title, 
  className, 
  editComponent, 
  deleteComponent 
}: BoxInfoItemProps) {
  return (
    <div className={cn("w-[60%]", className)}>
      <div className='w-full flex items-start justify-start flex-col mb-5'>
        <div className='w-full flex items-center justify-between mb-2'>
          <span className='text-base font-bold'>{title}</span>
          {editComponent && editComponent}
          {deleteComponent && deleteComponent}
        </div>
        <Separator/>
      </div>
          
      <div className='flex grid-flow-row grid-cols-2 gap-6'>
        <div className='flex flex-col items-center justify-center grid-flow-row gap-2'>
          {options && options.map((item, index) => 
            <span key={index} className='w-full h-9 flex items-center justify-end text-base font-semibold'>
              {item.name ? item.name : symbols.inValid}
            </span>)}
        </div>
        <div className='flex flex-col items-center justify-center grid-flow-row gap-2'>
          {options && options.map((item, index) => 
            <span key={index} className='w-full h-9 flex items-center justify-start text-base font-medium'>
              {item.content ? item.content : symbols.inValid}
            </span>)}
        </div>
      </div>
    </div>
  )
}

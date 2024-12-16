import React from 'react'
import { Button } from '../ui/button'

export interface BaseDeleteProps {
  title?: string, 
}

export default function BaseDelete({ title }: BaseDeleteProps) {
  return (
    <div className='w-full flex flex-col items-center justify-center space-y-6'>
      <div className='w-full text-base font-normal'>
        {title || "Are you sure you want to delete this item?"}
      </div>
      <div className='w-full flex items-center justify-between'>
        <Button variant={"destructive"}>Delete</Button>
      </div>
    </div>
  )
}

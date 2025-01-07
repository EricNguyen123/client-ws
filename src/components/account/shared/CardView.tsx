import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import React from 'react'

export default function CardView({ title, content, isScroll = false, height = '90' }: { 
  title?: React.ReactNode, 
  content?: React.ReactNode,
  isScroll?: boolean;
  height?: string;
}) {
  return (
    <div className='w-full h-full flex flex-col items-center justify-start 
                                    rounded-lg  border-[1px] border-accent shadow-sm p-2'>
      <div className="w-full h-6 text-sm font-bold flex items-center justify-start space-x-2">
        {title}
      </div>
      <Separator />
      <div className="w-full flex-1 pt-2">
        <ScrollArea className={`w-full ${isScroll ? `h-[${height}px]` : `flex-1`}`}>
          <div className="w-full h-max text-base font-thin overflow-hidden">
            <p>
              {content}
            </p>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

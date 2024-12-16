'use client'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import React from 'react'
import BaseSidebar, { BaseSidebarProps } from './BaseSidebar'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'

export default function CustomSidebar({ options, childrenHeader }: BaseSidebarProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"}>
          <Menu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='!p-0' align="start" sideOffset={4}>
        <DropdownMenuItem className='hover:!bg-transparent !p-0'>
          <BaseSidebar options={options} childrenHeader={childrenHeader}/>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

  )
}

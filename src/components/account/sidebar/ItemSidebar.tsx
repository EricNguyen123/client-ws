// import { Link } from '@/i18n/routing'
import React from 'react'
import { UrlObject } from 'url'

type ItemSidebarProps = {
  icon?: React.ReactNode,
  title: React.ReactNode,
  option?: React.ReactNode,
  href?: string | UrlObject,
  onClick?: () => void,
}

const Item = ({ title }: { title: React.ReactNode}) => {
  return (
    <div className='flex items-center justify-start text-base font-normal'>
      <span>{title}</span>
    </div>
  )
}

export default function ItemSidebar({ icon, title, option, onClick }: ItemSidebarProps) {
  return (
    <div 
      className='w-full flex items-center cursor-pointer justify-between peer/menu-button gap-2 overflow-hidden rounded-md p-2 text-left outline-none ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground h-8 text-sm'
      onClick={onClick}
    >
      <div className='flex items-center justify-start space-x-2'>
        <div className='flex items-center justify-center'>
          {icon}
        </div>
        {/* {option ? <Item title={title} />:
        (href && 
          <Link href={href}>
            <Item title={title} />
          </Link>)} */}
        <Item title={title} />
      </div>
      <div className='flex items-center justify-center'>
        {option}
      </div>
    </div>
  )
}

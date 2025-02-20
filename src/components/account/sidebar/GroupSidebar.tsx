'use client'

import React, { ReactNode, useEffect, useState } from 'react'
import ItemSidebar from './ItemSidebar'
import { useRouter } from '@/i18n/routing'
import { useSelector } from 'react-redux'
import { RoleEnum } from '@/common/general'

export type OptionMenu = {
  role?: string;
  option: ReactNode | undefined,
  optionActive: ReactNode | undefined,
  icon: ReactNode | undefined,
  title: ReactNode,
  href: string | undefined,
  items: OptionMenu[],
}

export type GroupSidebarProps = {
  options: OptionMenu[] | undefined,
}

const Item = ({ icon, title, href, option, optionActive, items }: OptionMenu) => {
  const [open, setOpen] = useState<boolean>(false);
  const routes = useRouter();
  const handleClick = (e: React.MouseEvent) => {
    if (items.length > 0) {
      e.stopPropagation();
      setOpen(!open);
    }
    if (href && (!option || !optionActive)) {
      routes.push(href)
    }
  }
  return (
    <div className='w-full h-max flex flex-col items-start justify-center gap-1'>
      <ItemSidebar 
        icon={icon} 
        title={title} 
        href={href} 
        option={!open ? option : optionActive} 
        onClick={handleClick}
      />
        <div className='w-full h-max pl-2 flex flex-col items-start justify-center'>
          {items && open &&
          <div className='w-full h-max translate-x-px pl-2 border-l gap-1 flex flex-col items-start justify-center'>
            <Groups options={items} />
          </div>}
        </div>
    </div>
  )
}

const Groups = ({ options }: GroupSidebarProps) => {
  const [inRole, setInRole] = useState<string>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const authSelector = useSelector(({ auth } : any) => auth);
  useEffect(() => {
    if (authSelector.authenticated) {
      setInRole(authSelector.userInfo?.role)
    }
  }, [authSelector])
  return options && options.map(({ icon, title, href, option, optionActive, items, role }, index) => {
    if (role && role !== inRole && role !== RoleEnum.Default) return <div key={index}></div>
    if (!role || (role && role === RoleEnum.Default) || (role && role === inRole)) {
      return  <Item
                key={index} 
                icon={icon} 
                title={title} 
                href={href} 
                option={option} 
                optionActive={optionActive} 
                items={items}
              />            
    }                                      
  })
}

export default function GroupSidebar({ options }: GroupSidebarProps) {
  return (
    <div className='w-60 min-h-0 h-full overflow-auto scrollbar-hide p-2 flex flex-col items-center justify-start'>
      {options && options.length > 0 && <Groups options={options} />}
    </div>
  )
}

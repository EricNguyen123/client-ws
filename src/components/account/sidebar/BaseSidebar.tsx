'use client'

import React, { ReactNode, useEffect, useState } from 'react'
import GroupSidebar, { OptionMenu } from './GroupSidebar'
import HeaderSidebar from './HeaderSidebar'

export type BaseSidebarProps = {
  options: OptionMenu[] | undefined,
  childrenHeader?: ReactNode,
}

export default function BaseSidebar({ options, childrenHeader }: BaseSidebarProps) {
  const [inOptions, setInOptions] = useState<OptionMenu[] | []>([])

  useEffect(() => {
    if (options) setInOptions(options)
  }, [options])

  return (
    <div className='h-full flex flex-col items-center justify-start'>
      {childrenHeader && <HeaderSidebar>{childrenHeader}</HeaderSidebar>}
      <GroupSidebar options={inOptions}/>
    </div>
  )
}

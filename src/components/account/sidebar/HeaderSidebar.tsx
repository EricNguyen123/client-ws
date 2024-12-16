import React, { ReactNode } from 'react'

export default function HeaderSidebar({ children }: { children: ReactNode }) {
  return (
    <div className='flex flex-col gap-2 p-2'>{children}</div>
  )
}

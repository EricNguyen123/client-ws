import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { useRouter } from '@/i18n/routing';
import React from 'react'

type ItemProps = {
  icon?: React.ReactNode,
  children: React.ReactNode,
  route?: string | undefined,
}

export default function ItemMenu({ icon, children , route }: ItemProps) {
  const routes = useRouter();
  const handleClick = () => {
    routes.push(`${route}`)
  }
  return (
    <DropdownMenuItem onClick={handleClick}>
      {icon && icon}
      {children}
    </DropdownMenuItem>
  )
}

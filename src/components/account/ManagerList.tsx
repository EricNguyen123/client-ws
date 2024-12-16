/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { RoleEnum } from '@/common/general';
import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { Boxes, GalleryVertical, List, ReceiptText, Store, Telescope, Truck, Users } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import ItemMenu from './shared/ItemMenu';
import config from '@/config';
import { UserPen } from 'lucide-react'
import { useTranslations } from 'next-intl';

export default function ManagerList() {
  const authSelector = useSelector(({ auth } : any) => auth);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const t = useTranslations("Account");
  useEffect(() => {
    setIsAdmin(authSelector.userInfo?.role === RoleEnum.Admin 
      || authSelector.userInfo?.role === RoleEnum.Editor);
  }, [authSelector.userInfo]);

  return (
    <>
      <DropdownMenuGroup>
        <ItemMenu 
          icon={<UserPen className='mr-2'/>} 
          route={config.routes.private.profile}
        >
          {t('profile.title')}
        </ItemMenu>
        {!isAdmin &&
        <DropdownMenuItem>
          <ReceiptText className='mr-2'/>
          Bills
        </DropdownMenuItem>}
      </DropdownMenuGroup>
      {isAdmin && <>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuLabel>Manager</DropdownMenuLabel>
        <DropdownMenuItem>
          <ReceiptText className='mr-2'/>
          Bills
        </DropdownMenuItem>
        <ItemMenu 
          icon={<Users className='mr-2'/>} 
          route={config.routes.private.users}
        >
          {t('users.title')}
        </ItemMenu>
        <DropdownMenuItem>
          <List className='mr-2'/>
          Categories
        </DropdownMenuItem>
        <DropdownMenuItem>
          <GalleryVertical className='mr-2'/>
          Banners
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Telescope className='mr-2'/>
          Campaign
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Boxes className='mr-2'/>
          Products
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Truck className='mr-2'/>
          Shipping
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Store className='mr-2'/>
          Stores
        </DropdownMenuItem>
      </DropdownMenuGroup>
      </>}
    </>
  )
}

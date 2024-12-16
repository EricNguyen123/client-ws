/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { Trash2, X } from 'lucide-react'
import { useTranslations } from 'next-intl';

export interface BaseButtonProps {
  handleCancel?: (i?: any) => void,
  handleDelete?: (i?: any) => void,
  size?: "default" | "sm" | "lg" | "icon",
  variant?: "default" | "circle",
  className?: string,
  btnNameDelete?: React.ReactNode,
  btnNameCancel?: React.ReactNode,
}

export default function BaseButtonDelete({ handleCancel, handleDelete, variant = "default", size = "default", className, btnNameCancel, btnNameDelete }: BaseButtonProps) {
  const t = useTranslations('Delete');
  return (
    <div className={`${variant === "circle" ? "w-max flex items-center space-x-2" : "w-full grid items-center grid-flow-row grid-cols-2 gap-3"}`}>
      <Button variant={"outline"} size={size} className={cn(`${variant === "circle" ? "rounded-full w-9 !p-2": "w-full"}`, className)} onClick={handleCancel}>
        {variant === "circle" && <X />}
        {variant === "default" && (btnNameCancel || t('cancel'))}
      </Button>
      <Button variant={"destructive"} size={size} className={cn(`${variant === "circle" ? "rounded-full w-9 !p-2": "w-full"}`, className)} onClick={handleDelete}>
        {variant === "circle" && <Trash2 />}
        {variant === "default" && (btnNameDelete || t('delete'))}
      </Button>
    </div>
  )
}

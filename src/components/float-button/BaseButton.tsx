/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { MoreHorizontal, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog'

export interface OptionsProps {
  icon?: React.ReactNode;
  content?: React.ReactNode;
  handle?: (i?: any) => void;
  color?: string;
  dialog?: React.ReactNode;
  key?: any;
}

export interface BaseButtonProps {
  options?: OptionsProps[];
  className?: string;
  handle?: (i?: any) => void;
  variant?: "plus" | "horizontal"
}

export default function BaseButton({ options, className, handle, variant = "plus" }: BaseButtonProps) {
  const [openDialog, setOpenDialog] = useState<React.ReactNode>();
  const [openCheck, setOpenCheck] = useState<boolean>(false);
  const handleCloseDialog = () => setOpenCheck(false);

  return (
    <Dialog open={openCheck} onOpenChange={setOpenCheck}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className={cn(className)}>
          <Button 
            variant={variant === "plus" ? "outline" : "ghost"} 
            className={variant === "plus" ? "rounded-full w-9 !p-2 hover:!bg-rose-500 hover:text-white" : "h-8 w-10 p-0"}>
            {variant === "plus" ? <Plus /> : <MoreHorizontal />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {options && options.map((option, index) => 
          (option.dialog ? <DialogTrigger key={index} asChild>
            <DropdownMenuItem 
              className={`${option.color}`}
              onClick={() => {
                option.dialog && setOpenDialog(React.cloneElement(option.dialog as React.ReactElement, {
                        closeDialog: handleCloseDialog,
                      }));
                option.handle && option.handle();
                option.key && handle && handle(option.key);
              }}
            >
              {option.icon && option.icon}
              {option.content}
            </DropdownMenuItem>
          </DialogTrigger> : 
          <DropdownMenuItem 
            key={index}
            className={`${option.color}`}
            onClick={() => {
              option.dialog && setOpenDialog(React.cloneElement(option.dialog as React.ReactElement, {
                      closeDialog: handleCloseDialog,
                    }));
              option.handle && option.handle();
              option.key && handle && handle(option.key);
            }}
          >
            {option.icon && option.icon}
            {option.content}
          </DropdownMenuItem>
        ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogTitle></DialogTitle>
        {openDialog && openDialog}
      </DialogContent>
    </Dialog>
  )
}

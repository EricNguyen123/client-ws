/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { symbols } from "@/constant"
import { Eye, EyeOff, SquarePen } from "lucide-react"
import React, { useEffect, useState } from "react"

type BoxEditProps = {
  icon?: React.ReactNode,
  options: { [key: string]: any }[];
  title?: React.ReactNode;
  labelBtn?: string;
  onSubmit?: (values: { [key: string]: string }) => void;
  description?: React.ReactNode;
  variantBtn?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
  openDialog?: boolean;
  useTrigger?: boolean;
}

export function BoxEdit({ 
  options, 
  title, 
  labelBtn, 
  onSubmit, 
  icon, 
  description, 
  variantBtn, 
  openDialog = false, 
  useTrigger = true 
}: BoxEditProps) {
  const [open, setOpen] = useState(openDialog);
  const [formValues, setFormValues] = useState(
    options.reduce((acc, item) => {
      acc[item.name] = item.content;
      return acc;
    }, {} as { [key: string]: string })
  );
  const [showPasswords, setShowPasswords] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (open) {
      setFormValues(
        options.reduce((acc, item) => {
          acc[item.name] = item.content;
          return acc;
        }, {} as { [key: string]: string })
      );
      setShowPasswords({})
    }
  }, [open, options])

  const handleInputChange = (name: string, value: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(formValues);
      setOpen(false);
    }
  };

  const togglePasswordVisibility = (name: string) => {
    setShowPasswords((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {useTrigger && 
      <DialogTrigger asChild>
        <Button variant={variantBtn ? variantBtn : "ghost"} className={`${variantBtn === "link" ? "!no-underline" : ""} hover:text-sky-500`}>
          {!icon ? <SquarePen /> : icon}
        </Button>
      </DialogTrigger>}
      <DialogContent className="w-fit min-w-[425px] sm:max-w-[max-content] max-w-full">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {options && options.map((item, index) => 
          <div key={index} className="w-full flex flex-col items-center justify-center space-y-2">
            <Label 
              htmlFor={item.name ? item.name : symbols.inValid} 
              className="w-full text-left xl:text-nowrap"
            >
              {item.name ? item.name : symbols.inValid}
            </Label>
            <div className='w-full relative'>
              <Input 
                id={item.name ? item.name : symbols.inValid} 
                value={formValues[item.name] ? formValues[item.name] : symbols.nonValue}
                placeholder={item.placeholder && item.placeholder}
                type={item.type && (item.type === "password" ? 
                                      (showPasswords[item.name] ? "text" : "password") : item.type)}
                onChange={(e) =>
                  handleInputChange(item.name, e.target.value)
                }
                className="w-full" />
              {item.type === "password" &&
              <span
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => togglePasswordVisibility(item.name)}
              >
                {!showPasswords[item.name] ? 
                  <Eye className='text-sky-500'/> : 
                  <EyeOff className='text-sky-500'/>}
              </span>}
            </div>
            
          </div>)}
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>{labelBtn ? labelBtn : "Save"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

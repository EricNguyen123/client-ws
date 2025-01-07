/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useTranslations } from "next-intl"
import { useEffect } from "react"

export interface OrderDateProps {
  title?: string,
  notice?: string,
  handle: (i: Date) => void,
  option?: "part" | "form",
  width?: "auto" | "default" | "full",
  placeholder?: string,
  reset?: boolean,
  defaultValue?: Date,
}

export function OrderDate({ 
  title, 
  notice, 
  handle, 
  option = 'form', 
  width = 'default', 
  placeholder,
  reset,
  defaultValue,
}: OrderDateProps) {
  const t = useTranslations("Calender");
  const FormSchema = z.object({
    dob: z.date({
      required_error: notice || t('notice'),
    }),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onDateSelect(date: Date) {
    form.setValue("dob", date);
    if (option === "part") {
      handle(date);
    }
  }


  useEffect(() => {
    if (reset) {
      form.reset();
    }
  }, [reset])

  useEffect(() => {
    if (defaultValue) {
      onDateSelect(defaultValue);
    }
  }, [defaultValue])

  return (
    <Form {...form}>
      <div className="w-full h-full flex flex-col items-start justify-center space-y-8">
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="w-full h-full flex flex-col items-start justify-center">
              {title && <FormLabel>{title}</FormLabel>}
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        `pl-3 text-left font-normal`,
                        !field.value && "text-muted-foreground",
                        width === 'auto' && 'w-auto',
                        width === 'full' && 'w-full',
                        width === 'default' && 'w-[240px]',
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PP")
                      ) : (
                        <span>{placeholder || t('placeholder')}</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 pointer-events-auto" align="start" >
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date: any) => {
                      onDateSelect(date);
                    }}
                    disabled={(date) =>
                      date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              
              <FormMessage />
            </FormItem>
          )}
        />
        {option === 'form' && 
        <Button type="submit" onClick={form.handleSubmit(({ dob }) => handle(dob))}>
          {t("btnSub")}
        </Button>}
      </div>
    </Form>
  )
}

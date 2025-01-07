/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FileUp } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OrderDate } from "../../shared/OrderDate";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { FormAddBannerSchema, FormEditBannerSchema } from "@/schema-validations/valid.schema";
import { useTranslations } from "next-intl";
import numberOrder from "@/constant/number-order-banners";

export function FormBanners({ handle, handleSubmit, variant = "add", data }: { 
    handle?: () => void, 
    handleSubmit?: (i: any, handleReset: () => void) => void,
    variant?: "add" | "edit",
    data?: any,
}) {
  const [preview, setPreview] = useState<string | null>(null);
  const [reset, setReset] = useState<boolean>(false);
  const t = useTranslations("Account");
  const FormSchema = variant === "add" ? FormAddBannerSchema : FormEditBannerSchema;
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: variant === "edit" && data ? {
      descriptions: data.descriptions || "",
      orderNumber: `${data.number_order}` || "",
      startDate: new Date(data.start_date),
      endDate: new Date(data.end_date),
    } : {
      descriptions: "",
      orderNumber: "",
      startDate: new Date(),
      endDate: new Date(),
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    handleSubmit && handleSubmit(data, handleReset);
  }

  const handleReset = () => {
    setPreview(null);
    form.reset();
    form.clearErrors();
    setReset(true);
    handle && handle();
  };

  useEffect(() => {
    if (data && variant === "edit") {
      setPreview(data.url || null);
      form.reset({
        descriptions: data.descriptions || "",
        orderNumber: `${data.number_order}` || "",
        startDate: new Date(data.start_date),
        endDate: new Date(data.end_date),
      });
    }
  }, [data, variant]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <div className={variant === "edit" ? "grid grid-cols-1 grid-rows-3 gap-8" : 
          "w-full grid grid-cols-1 grid-rows-3 gap-8 lg:grid-cols-3 lg:grid-rows-1 lg:gap-4"}>
          <div className="w-full flex items-center justify-center">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => {
                const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
                  if (variant === "edit") return;
                  const file = event.target.files?.[0];
                  if (file) {
                    const toBase64 = (file: File) =>
                      new Promise<string>((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onload = () => resolve(reader.result as string);
                        reader.onerror = reject;
                        reader.readAsDataURL(file);
                      });

                    const base64Url = await toBase64(file);
                    setPreview(base64Url);
                    field.onChange(file);
                  }
                };

                return (
                  <FormItem className="w-full h-full">
                    <FormLabel
                      className={`w-full h-full flex items-center justify-center 
                        border-dashed rounded-lg border-[1px] border-slate-400
                        cursor-pointer ${
                          preview ? "!border-emerald-500" : "hover:border-rose-500"
                        }
                        ${form.formState.errors.image ? "border-rose-500" : ""}`}
                    >
                      {!preview ? (
                        <div className="flex flex-col items-center justify-center space-y-3">
                          <FileUp className="w-8 h-8" />
                          <span>{t('banners.inImage')}</span>
                        </div>
                      ) : (
                        <div className="w-full h-full relative flex items-center justify-center p-2">
                          <Image
                            src={preview || ""}
                            alt="Preview"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg border"
                          />
                        </div>
                      )}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        disabled={variant === "edit"}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>

          <div className="w-full">
            <FormField
              control={form.control}
              name="descriptions"
              render={({ field }) => (
                <FormItem className="w-full h-full">
                  <FormControl>
                    <Textarea
                      placeholder="Enter descriptions"
                      {...field}
                      className={`w-full h-full resize-none ${
                        form.formState.errors.descriptions
                          ? "border-rose-500 focus-visible:ring-0"
                          : ""
                      }`}
                    />
                  </FormControl>
                  {form.formState.errors.descriptions && (
                    <FormMessage>{form.formState.errors.descriptions.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
          </div>

          <div className="w-full flex flex-col space-y-4">
            <FormField
              control={form.control}
              name="orderNumber"
              render={({ field }) => {
                return (
                <FormItem>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        if (data && value === "") {
                          field.onChange(`${data.number_order}`);
                        } else {
                          field.onChange(value);
                        }
                      }}
                    >
                      <SelectTrigger
                        className={`w-full ${
                          form.formState.errors.orderNumber ? "border-rose-500" : ""
                        }`}
                      >
                        <SelectValue placeholder={field.value || t("banners.placeholderSelect")}/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>{t("banners.numberOrder")}</SelectLabel>
                          {numberOrder.map((option) => (
                            <SelectItem key={option} value={String(option)}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {form.formState.errors.orderNumber && (
                    <FormMessage>{form.formState.errors.orderNumber.message}</FormMessage>
                  )}
                </FormItem>)
              }}
            />

            <div className="grid grid-cols-2 gap-4">
              <OrderDate
                placeholder={t('banners.startDate')}
                handle={(date) => {
                  form.setValue("startDate", date);
                  setReset(false);
                }}
                option="part"
                width="full"
                reset={reset}
                defaultValue={data?.start_date}
              />
              <OrderDate
                placeholder={t('banners.endDate')}
                handle={(date) => {
                  form.setValue("endDate", date);
                  setReset(false);
                }}
                option="part"
                width="full"
                reset={reset}
                defaultValue={data?.end_date}
              />
            </div>
            {form.formState.errors.startDate && (
              <p className="text-red-500 text-sm">{form.formState.errors.startDate.message}</p>
            )}
            {form.formState.errors.endDate && (
              <p className="text-red-500 text-sm">{form.formState.errors.endDate.message}</p>
            )}
            <Separator />
            <div className={variant === "edit" ? "w-full flex flex-1 items-center justify-center" : "w-full grid grid-cols-2 gap-4"}>
              {variant !== 'edit' &&
              <Button variant={"outline"} className="w-full" onClick={handleReset}>
                {t("banners.button.cancel")}
              </Button>}
              <Button type="submit" className="w-full">
                {t("banners.button.submit")}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unused-expressions */
// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { Check, FileUp, PencilOff } from "lucide-react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { OrderDate } from "../../shared/OrderDate";
// import Image from "next/image";
// import { useState } from "react";
// import { Separator } from "@/components/ui/separator";
// import { FormAddBannerSchema } from "@/schema-validations/valid.schema";
// import { useDispatch } from "react-redux";
// import { createBanner } from "@/store/banners/actions";
// import { useTranslations } from "next-intl";
// import numberOrder from "@/constant/number-order-banners";
// import { toast } from "@/hooks/use-toast";
// import { ErrorNumber } from "@/common/general";

// export function AddBanners({ handle }: { handle?: () => void }) {
//   const [preview, setPreview] = useState<string | null>(null);
//   const [reset, setReset] = useState<boolean>(false);
//   const dispatch = useDispatch();
//   const t = useTranslations("Account");

//   const form = useForm<z.infer<typeof FormAddBannerSchema>>({
//     resolver: zodResolver(FormAddBannerSchema),
//     defaultValues: {
//       descriptions: "",
//       orderNumber: "",
//       startDate: new Date(),
//       endDate: new Date(),
//     },
//   });

//   function onSubmit(data: z.infer<typeof FormAddBannerSchema>) {
//     dispatch(createBanner({
//       data: {
//         descriptions: data.descriptions,
//         image: data.image,
//         orderNumber: data.orderNumber,
//         startDate: data.startDate,
//         endDate: data.endDate,
//       },
//       setError: (error) => {
//         if(error.status >= ErrorNumber.ErrorCode) {
//           toast({
//             title: t("banners.error.title"),
//             description: <div className="flex items-center justify-start">
//               <PencilOff className="mr-5 text-red-500"/>{t("banners.error.description_1")}
//             </div>,
//           })
//         }
//       },
//       setSuccess: (success) => {
//         if (success.status >= ErrorNumber.Success && success.status < ErrorNumber.Warning) {
//           toast({
//             title: t("banners.success.title"),
//             description: <div className="flex items-center justify-start">
//               <Check className="mr-5 text-emerald-500"/>{t("banners.success.description")}
//             </div>,
//           })
//         }
//         handleReset();
//       },
//     }))
//   }

//   const handleReset = () => {
//     setPreview(null);
//     form.reset();
//     form.clearErrors();
//     setReset(true);
//     handle && handle();
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
//         <div className="grid grid-cols-1 grid-rows-3 gap-8 lg:grid-cols-3 lg:grid-rows-1 lg:gap-4">
//           <div className="w-full flex items-center justify-center">
//             <FormField
//               control={form.control}
//               name="image"
//               render={({ field }) => {
//                 const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
//                   const file = event.target.files?.[0];
//                   if (file) {
//                     const toBase64 = (file: File) =>
//                       new Promise<string>((resolve, reject) => {
//                         const reader = new FileReader();
//                         reader.onload = () => resolve(reader.result as string);
//                         reader.onerror = reject;
//                         reader.readAsDataURL(file);
//                       });

//                     const base64Url = await toBase64(file);
//                     setPreview(base64Url);
//                     field.onChange(file);
//                   }
//                 };

//                 return (
//                   <FormItem className="w-full h-full">
//                     <FormLabel
//                       className={`w-full h-full flex items-center justify-center 
//                         border-dashed rounded-lg border-[1px] border-slate-400
//                         cursor-pointer ${
//                           preview ? "!border-emerald-500" : "hover:border-rose-500"
//                         }
//                         ${form.formState.errors.image ? "border-rose-500" : ""}`}
//                     >
//                       {!preview ? (
//                         <div className="flex flex-col items-center justify-center space-y-3">
//                           <FileUp className="w-8 h-8" />
//                           <span>{t('banners.inImage')}</span>
//                         </div>
//                       ) : (
//                         <div className="w-full h-full relative flex items-center justify-center p-2">
//                           <Image
//                             src={preview || ""}
//                             alt="Preview"
//                             layout="fill"
//                             objectFit="cover"
//                             className="rounded-lg border"
//                           />
//                         </div>
//                       )}
//                     </FormLabel>
//                     <FormControl>
//                       <Input
//                         type="file"
//                         accept="image/*"
//                         onChange={handleFileChange}
//                         className="hidden"
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 );
//               }}
//             />
//           </div>

//           <div className="w-full">
//             <FormField
//               control={form.control}
//               name="descriptions"
//               render={({ field }) => (
//                 <FormItem className="w-full h-full">
//                   <FormControl>
//                     <Textarea
//                       placeholder="Enter descriptions"
//                       {...field}
//                       className={`w-full h-full resize-none ${
//                         form.formState.errors.descriptions
//                           ? "border-rose-500 focus-visible:ring-0"
//                           : ""
//                       }`}
//                     />
//                   </FormControl>
//                   {form.formState.errors.descriptions && (
//                     <FormMessage>{form.formState.errors.descriptions.message}</FormMessage>
//                   )}
//                 </FormItem>
//               )}
//             />
//           </div>

//           <div className="w-full flex flex-col space-y-4">
//             <FormField
//               control={form.control}
//               name="orderNumber"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormControl>
//                     <Select
//                       value={field.value}
//                       onValueChange={field.onChange}
//                       defaultValue={field.value}
//                     >
//                       <SelectTrigger
//                         className={`w-full ${
//                           form.formState.errors.orderNumber ? "border-rose-500" : ""
//                         }`}
//                       >
//                         <SelectValue placeholder={t("banners.placeholderSelect")} />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectGroup>
//                           <SelectLabel>{t("banners.numberOrder")}</SelectLabel>
//                           {numberOrder.map((option) => (
//                             <SelectItem key={option} value={String(option)}>
//                               {option}
//                             </SelectItem>
//                           ))}
//                         </SelectGroup>
//                       </SelectContent>
//                     </Select>
//                   </FormControl>
//                   {form.formState.errors.orderNumber && (
//                     <FormMessage>{form.formState.errors.orderNumber.message}</FormMessage>
//                   )}
//                 </FormItem>
//               )}
//             />

//             <div className="grid grid-cols-2 gap-4">
//               <OrderDate
//                 placeholder={t('banners.startDate')}
//                 handle={(date) => {
//                   form.setValue("startDate", date);
//                   setReset(false);
//                 }}
//                 option="part"
//                 width="full"
//                 reset={reset}
//               />
//               <OrderDate
//                 placeholder={t('banners.endDate')}
//                 handle={(date) => {
//                   form.setValue("endDate", date);
//                   setReset(false);
//                 }}
//                 option="part"
//                 width="full"
//                 reset={reset}
//               />
//             </div>
//             {form.formState.errors.startDate && (
//               <p className="text-red-500 text-sm">{form.formState.errors.startDate.message}</p>
//             )}
//             {form.formState.errors.endDate && (
//               <p className="text-red-500 text-sm">{form.formState.errors.endDate.message}</p>
//             )}
//             <Separator />
//             <div className="w-full grid grid-cols-2 gap-4">
//               <Button variant={"outline"} className="w-full" onClick={handleReset}>
//                 {t("banners.button.cancel")}
//               </Button>
//               <Button type="submit" className="w-full">
//                 {t("banners.button.submit")}
//               </Button>
//             </div>
//           </div>
//         </div>
//       </form>
//     </Form>
//   );
// }


import React from 'react'
import { FormBanners } from './FormBanner'
import { useDispatch } from 'react-redux'
import { createBanner } from '@/store/banners/actions';
import { ErrorNumber } from '@/common/general';
import { toast } from '@/hooks/use-toast';
import { Check, PencilOff } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function AddBanners({ handle }: { handle?: () => void }) {
  const dispatch = useDispatch();
  const t = useTranslations("Account");

  const handleSubmit = (data: any, handleReset: () => void) => {
    dispatch(createBanner({
            data: {
              descriptions: data.descriptions,
              image: data.image,
              orderNumber: data.orderNumber,
              startDate: data.startDate,
              endDate: data.endDate,
            },
            setError: (error) => {
              if(error.status >= ErrorNumber.ErrorCode) {
                toast({
                  title: t("banners.error.title"),
                  description: <div className="flex items-center justify-start">
                    <PencilOff className="mr-5 text-red-500"/>{t("banners.error.description_1")}
                  </div>,
                })
              }
            },
            setSuccess: (success) => {
              if (success.status >= ErrorNumber.Success && success.status < ErrorNumber.Warning) {
                toast({
                  title: t("banners.success.title"),
                  description: <div className="flex items-center justify-start">
                    <Check className="mr-5 text-emerald-500"/>{t("banners.success.description")}
                  </div>,
                })
              }
              handleReset();
            },
          }))
  }
  return (
    <FormBanners handle={handle} handleSubmit={handleSubmit}/>
  )
}

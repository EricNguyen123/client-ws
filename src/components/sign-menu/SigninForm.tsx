/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useTranslations } from "next-intl"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import config from "@/config"
import { Eye, EyeOff, ServerCrash } from "lucide-react"
import { login } from "@/store/auth/actions"
import { LoginBody, LoginBodyType } from "@/schema-validations/auth.schema"
import { Link } from "@/i18n/routing"
import { ErrorNumber } from "@/common/general"
import { useToast } from "@/hooks/use-toast"
import SigninThird from "./SigninThird"
import ForgotPassword from "../account/shared/ForgotPassword"

export default function SigninForm() {
  const dispatch = useDispatch();
  const t = useTranslations('Signin');
  const authSelector = useSelector(({ auth } : any) => auth);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { toast } = useToast();
  const tError = useTranslations('ErrorResponse');

  useEffect(() => {
    if (authSelector.authenticated) {
      router.push(`${config.routes.public.home}`);
    }
  }, [authSelector, router]);

  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: "",
      password: "",
    },
  })
 
  function onSubmit(values: LoginBodyType) {
    dispatch(login({
      data: values,
      setError: (error) => {
        if(error.status >= ErrorNumber.ErrorCode) {
          toast({
            title: tError("signIn.title"),
            description: <div className="flex items-center justify-start">
              <ServerCrash className="mr-5 text-red-500"/>{tError("signIn.description")}
            </div>,
          })
        }
      },
    }))
  }

  return (
      <Form {...form}>
        <div className="text-xl font-semibold mb-6 w-full flex items-center justify-start">{t("title")}</div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('email')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('placeholderEmail')} type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('password')}</FormLabel>
                <FormControl>
                  <div className='w-full relative'>
                    <Input placeholder={t('placeholderPassword')} type={showPassword ? "text" : "password"}  {...field} />
                    <span
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {!showPassword ? 
                        <Eye className='text-sky-500'/> : 
                        <EyeOff className='text-sky-500'/>}
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-[100%]">{t('submit')}</Button>
        </form>
        <div className='w-full flex items-center justify-between mt-3'>
          <ForgotPassword className={"text-base !font-normal !text-sky-500 hover:!text-sky-700"}/>
          <Link 
            href={`/${config.routes.public.register}`}
            className='text-base font-normal text-sky-500 hover:text-sky-700 px-4 py-2'>
            {t('register')}
          </Link>
        </div>
        <SigninThird/>
      </Form>
    )  
}

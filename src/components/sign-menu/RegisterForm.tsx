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
import { RegisterBody, RegisterBodyType } from "@/schema-validations/auth.schema"
import { useTranslations } from "next-intl"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import config from "@/config"
import { CircleCheck, Eye, EyeOff, ServerCrash } from "lucide-react"
import { register } from "@/store/auth/actions"
import { useToast } from "@/hooks/use-toast"
import { Link, useRouter } from "@/i18n/routing"
import { ErrorNumber } from "@/common/general"

export function RegisterForm() {
    const t = useTranslations('Register');
    const tError = useTranslations('ErrorResponse');
    const dispatch = useDispatch();
    const form = useForm<RegisterBodyType>({
      resolver: zodResolver(RegisterBody),
      defaultValues: {
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
      },
    })
    const authSelector = useSelector(({ auth } : any) => auth);
    const [registered, setRegistered] = useState<boolean>(false);
    const router = useRouter();
    const [showPassword, setShowPassword] = useState<boolean>(false); 
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const { toast } = useToast()
    useEffect(() => {
      if (authSelector.authenticated) {
        router.push(`${config.routes.public.home}`);
      }
      if (authSelector.registered) {
        setRegistered(true);
      }
      if(registered) {
        router.push(`${config.routes.public.login}`);
        setRegistered(false);
        toast({
          title: t("success.title"),
          description: <div className="flex items-center justify-start">
            <CircleCheck className="mr-5"/>{t("success.description")}
          </div>,
        })
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authSelector, router]);
    
    function onSubmit(values: RegisterBodyType) {
      dispatch(register({
        data: values,
        setError: (error) => {
          if(error.status >= ErrorNumber.ErrorCode) {
            toast({
              title: tError("register.title"),
              description: <div className="flex items-center justify-start">
                <ServerCrash className="mr-5 text-red-500"/>{error?.response?.data?.message||tError("register.description")}
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('name')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("placeholderName")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('confirmPassword')}</FormLabel>
                  <FormControl>
                    <div className='w-full relative'>
                      <Input placeholder={t('placeholderConfirmPassword')} type={showConfirmPassword ? "text" : "password"}  {...field} />
                      <span
                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {!showConfirmPassword ? 
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
            <div className="w-full flex items-center justify-start">
              <span className="mr-5 text-base font-normal">{t("haveAccount")}</span>
              <Link 
                href={`/${config.routes.public.login}`}
                className="text-base font-normal text-sky-500 hover:text-sky-700"
              >
                {t("signinNow")}
              </Link>
            </div>
          </form>
        </Form>
      )    
  }
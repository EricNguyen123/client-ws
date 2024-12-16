/* eslint-disable @typescript-eslint/no-unused-expressions */
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
import { useDispatch } from "react-redux"
import { useState } from "react"
import { Check, Eye, EyeOff, ServerCrash } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { ErrorNumber } from "@/common/general"
import { createUser } from "@/store/user/actions"

export interface RegisterUserProps {
  closeDialog?: () => void,
}

export default function RegisterUser({ closeDialog }: RegisterUserProps) {
  const t = useTranslations('Account');
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
    const [showPassword, setShowPassword] = useState<boolean>(false); 
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const { toast } = useToast()

    function onSubmit(values: RegisterBodyType) {
      dispatch(createUser({
        data: values,
        setError: (error) => {
          if(error.status >= ErrorNumber.ErrorCode) {
            toast({
              title: tError("users.error.title"),
              description: <div className="flex items-center justify-start">
                <ServerCrash className="mr-5 text-red-500"/>{error?.response?.data?.message||tError("users.error.description_1")}
              </div>,
            })
          }
        },
        setSuccess: (success) => {
          if (success.status >= ErrorNumber.Success && success.status < ErrorNumber.Warning) {
            closeDialog && closeDialog();
            toast({
              title: t("users.success.title"),
              description: <div className="flex items-center justify-start">
                <Check className="mr-5 text-emerald-500"/>{t("users.success.description_1")}
              </div>,
            })
          }
        },
      }))
    }
  return (
        <Form {...form}>
          <div className="text-xl font-semibold mb-6 w-full flex items-center justify-start">{t("users.create.title")}</div>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('users.create.name')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("users.create.placeholderName")} {...field} />
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
                  <FormLabel>{t('users.create.email')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('users.create.placeholderEmail')} type="email" {...field} />
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
                  <FormLabel>{t('users.create.password')}</FormLabel>
                  <FormControl>
                    <div className='w-full relative'>
                      <Input placeholder={t('users.create.placeholderPassword')} type={showPassword ? "text" : "password"}  {...field} />
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
                  <FormLabel>{t('users.create.confirmPassword')}</FormLabel>
                  <FormControl>
                    <div className='w-full relative'>
                      <Input placeholder={t('users.create.placeholderConfirmPassword')} type={showConfirmPassword ? "text" : "password"}  {...field} />
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
            <Button type="submit" className="w-[100%]">{t('users.create.submit')}</Button>
          </form>
        </Form>
  )
}

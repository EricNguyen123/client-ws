/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useTranslations } from "next-intl";
import { ProductBodyType, ProductSchema } from "@/schema-validations/product.schema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { statusProducts } from "@/constant";
import { StatusProductsEnum } from "@/common/general";
import { formatCurrencyMoney, formatPercent, parseCurrencyMoney, parseMultiplicationRate, parsePercent } from "@/utils";
import { Loader2, Percent } from "lucide-react";


export default function FormProduct({ handleSubmit, variant = "add", data, loading }: {
  handleSubmit?: (i: any, handleReset: () => void) => void,
  variant?: "add" | "edit",
  data?: any,
  loading?: boolean,
}) {
  const t = useTranslations("Account");
  const form = useForm({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: "",
      code: "",
      price: 0,
      quantity: 0,
      quantity_alert: 0,
      order_unit: 1,
      description: "",
      status: StatusProductsEnum.OnSale,
      multiplication_rate: 100,
      discount: 0,
    },
  });

  function onSubmit(values: ProductBodyType) {
    handleSubmit && handleSubmit(values, handleReset);
  }
  
  const handleReset = () => {
    form.reset();
    form.clearErrors();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("products.form.name")}</FormLabel>
              <FormControl>
                <Input placeholder={t("products.form.placeholder.name")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("products.form.code")}</FormLabel>
              <FormControl>
                <Input placeholder={t("products.form.placeholder.code")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("products.form.price")}</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    placeholder={t("products.form.placeholder.price")} 
                    {...field} 
                    value={formatCurrencyMoney(Number(field.value))}
                    onChange={(e) => field.onChange(parseCurrencyMoney(e.target.value))}
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm font-semibold">đ</span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("products.form.quantity")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("products.form.placeholder.quantity")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity_alert"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("products.form.quantity_alert")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("products.form.placeholder.quantity_alert")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="order_unit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("products.form.order_unit")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("products.form.placeholder.order_unit")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        </div>
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("products.form.description")}</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder={t("products.form.placeholder.description")} 
                  {...field} 
                  className="resize-none h-32"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("products.form.status")}</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                defaultValue={field.value.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t("products.form.placeholder.status")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {
                    Object.values(statusProducts).map((status, index) => (
                      <SelectItem key={index} value={status.toString()}>
                        {t(`products.form.enum.${status}`)}
                      </SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="multiplication_rate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("products.form.multiplication_rate")}</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input placeholder={t("products.form.placeholder.multiplication_rate")} {...field} />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                    <span className="text-sm font-semibold">{t("products.form.selling_price")}</span>
                    <span className="text-base font-normal">
                      {`${formatCurrencyMoney(parseMultiplicationRate( Number(field.value), Number(form.getValues('price'))))}`}
                    </span>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="discount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("products.form.discount")}</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    placeholder={t("products.form.placeholder.discount")} 
                    {...field}
                    value={field.value !== 0 ? formatPercent(Number(field.value)) : 0}
                    onChange={(e) => {
                      const parsedValue = parsePercent(e.target.value);
                      field.onChange(parsedValue);
                    }}
                  />
                  <Percent className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4"/>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading && <Loader2 className="animate-spin" />}
          {t("products.button.submit")}
        </Button>
      </form>
    </Form>
  );
}

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import ItemColor from './ItemColor';
import { useDispatch, useSelector } from 'react-redux';
import { getColors } from '@/store/colors/actions';
import { toast } from '@/hooks/use-toast';
import { ErrorNumber } from '@/common/general';
import { Check, PencilOff } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ItemColorProps { 
  id: string, 
  color_code: string, 
  createdDate: string 
}

export default function ViewColors() {
  const t = useTranslations("Account");
  const dispatch = useDispatch();
  const colorsSelector = useSelector(({ color }: any) => color);
  const { colors } = colorsSelector;
  const [arrColors, setArrColors] = React.useState<ItemColorProps[]>([]);

  useEffect(() => {
    if (!colors) {
      dispatch(getColors({
        setError: (error) => {
          if(error.status >= ErrorNumber.ErrorCode) {
            toast({
              title: t("products.error.title"),
              description: 
              <div className="flex items-center justify-start">
                <PencilOff className="mr-5 text-red-500"/>{t("products.error.description_5")}
              </div>,
            })
          }
        },
        setSuccess: (success) => {
          if (success.status >= ErrorNumber.Success && success.status < ErrorNumber.Warning) {
            toast({
              title: t("products.success.title"),
              description: 
              <div className="flex items-center justify-start">
                <Check className="mr-5 text-emerald-500"/>{t("products.success.description_5")}
              </div>,
            })
          }
        },
      }));
    } else {
      setArrColors(colors);
    }
  }, [colors])
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4">
      {arrColors.length > 0 && arrColors.map((color: ItemColorProps, index) => (
        <div key={index} className="w-full h-max">
          <ItemColor color={color.color_code} date={color.createdDate} id={color.id}/>
        </div>
      ))}
    </div>
  );
}

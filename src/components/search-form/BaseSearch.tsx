/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
'use client'

import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { useTranslations } from 'next-intl';
import { useDebounce } from '@/hooks/use-debounce';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import { Button } from '../ui/button';

const searchVariants = cva(
  "w-full",
  {
    variants: {
      variant: {
        default: "rounded-md border border-gray-300",
        search: "rounded-full border border-gray-300 pl-4 pr-10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);


interface BaseSearchProps extends VariantProps<typeof searchVariants> {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  variant?: "default" | "search";
}

export default function BaseSearch({ placeholder, value, onChange, className, variant }: BaseSearchProps) {
  const t = useTranslations('Search');
  const [newValue, setNewValue] = useState<string>(value ? value : "");
  const debouncedValue = useDebounce(newValue, 500); 

  useEffect(() => {
    if (onChange) {
      onChange(debouncedValue);
    }
  }, [debouncedValue]);

  return (
    <div className="w-full lg:w-[380px] items-center relative flex">
      <Input
          placeholder={placeholder || t('placeholder')}
          value={newValue}
          onChange={(event) =>
            setNewValue(event.target.value)
          }
          className={cn(searchVariants({ variant, className }))}
        />
      {variant === 'search' && (
        <Button variant={"ghost"} className="!size-9 !p-2 rounded-full absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:border hover:border-gray-300">
          <Search  />
        </Button>
      )}
    </div>
  )
}

'use client';

import {useParams} from 'next/navigation';
import { useTransition} from 'react';
import {Locale, usePathname, useRouter} from '@/i18n/routing';
import { Select, SelectContent, SelectGroup, SelectLabel, SelectTrigger, SelectValue } from './ui/select';
import { LocaleProps } from '@/types';

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  label
}: LocaleProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(value: string) {
    const nextLocale = value as Locale;
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        {pathname, params},
        {locale: nextLocale}
      );
    });
  }

  return (
    <Select defaultValue={defaultValue} onValueChange={onSelectChange} disabled={isPending}>
      <SelectTrigger className="w-[140px] h-[28px] mr-[8px]">
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {children}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

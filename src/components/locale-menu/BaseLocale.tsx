'use client'

import React, { useState, useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import BaseLocaleSelect from './BaseLocaleSelect';
import { Locale, routing, usePathname, useRouter } from '@/i18n/routing';
import { DropdownMenuCheckboxItem } from '../ui/dropdown-menu';
import {useParams} from 'next/navigation';

export default function BaseLocale() {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();
  const [selectedLocale, setSelectedLocale] = useState<string>(locale);
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
  function handleCheckedChange(newLocale: string) {
    setSelectedLocale(newLocale);
    onSelectChange(newLocale);
  }

  return (
    <BaseLocaleSelect defaultValue={selectedLocale} label={t('label')} isPending={isPending}>
      {routing.locales.map((curLocale) => (
        <DropdownMenuCheckboxItem
          key={curLocale}
          checked={selectedLocale === curLocale}
          onCheckedChange={() => handleCheckedChange(curLocale)}
        >
          {t('locale', { locale: curLocale })}
        </DropdownMenuCheckboxItem>
      ))}
    </BaseLocaleSelect>
  );
}

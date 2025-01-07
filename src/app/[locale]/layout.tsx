import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import BaseLayout from '@/components/BaseLayout';
import { getTranslations } from 'next-intl/server';
import { Props } from '@/types';
import BaseLoading from '@/components/BaseLoading';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params
}: Omit<Props, 'children'>) {
  const { locale } = await params;
  const t = await getTranslations({locale, namespace: 'Layout'});

  return {
    title: t('LocaleLayout.title')
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Props) {
  const { locale } = await params;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  return (
    <BaseLayout locale={locale}>
      <BaseLoading/>
      <div className='w-full h-screen box-border border overflow-scroll p-2 pb-12
                      lg:px-6 lg:py-5 xl:px-20 xl:py-5 scrollbar-no-hover-bg'>
        {children}
      </div>
    </BaseLayout>
  );
}
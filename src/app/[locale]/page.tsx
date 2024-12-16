import {getTranslations, setRequestLocale} from 'next-intl/server';
import PageLayout from '@/components/PageLayout';

type Props = {
  params: {locale: string};
};

export default async function HomePage({params}: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({locale, namespace: 'HomePage'});

  return (
    <PageLayout title={t('title')}>
      <p className="max-w-[590px]">
      {t.rich('description', {
          p: (chunks) => <p className="mt-4">{chunks}</p>,
          retry: (chunks) => (
            <button
              className="text-white underline underline-offset-2"
              
              type="button"
            >
              {chunks}
            </button>
          )
        })}
      </p>
    </PageLayout>
  );
}

import React from 'react'
import { Button } from '../ui/button'
import { Mail } from 'lucide-react'
import { useTranslations } from 'next-intl';
import config from '@/config';
import { Separator } from '../ui/separator';

export default function SigninThird() {
  const t = useTranslations('Signin');
  const rootUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;
  const handleLoginWithGoogle = () => {
    window.location.href = `${rootUrl}${config.routes.protected.google}`
  }

  return (
    <div className='w-full mt-3 space-y-3'>
      <div className='w-full flex items-center justify-between'>
        <Separator className='w-[36%]'/>
        <span>{t('third.or')}</span>
        <Separator className='w-[36%]'/>
      </div>
      <div className="w-full flex items-center justify-between">
        <Button className="w-full" onClick={() => { handleLoginWithGoogle() } }>
          <Mail className="mr-2 h-4 w-4" /> {t('third.google')}
        </Button>
      </div>
    </div>
  )
}

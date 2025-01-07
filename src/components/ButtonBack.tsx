import React from 'react'
import { Button } from './ui/button'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from '@/i18n/routing';

export default function ButtonBack() {
  const routes = useRouter();
  return (
    <Button variant={"ghost"} onClick={() => {routes.back()}}>
      <ChevronLeft />
    </Button>
  )
}

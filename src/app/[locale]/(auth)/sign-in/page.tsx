import SigninForm from '@/components/sign-menu/SigninForm'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

export default function SignInPage() {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <div className='w-[38%]'>
        <SessionProvider>
          <SigninForm/>
        </SessionProvider>
      </div>
    </div>
  )
}

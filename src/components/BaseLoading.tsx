/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useEffect, useState } from 'react'
import Loading from './skeleton/loading'
import { useSelector } from 'react-redux';

export default function BaseLoading() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const authLoading = useSelector(({ auth } : any) => auth.loading);
  const userLoading = useSelector(({ user } : any) => user.loading);

  useEffect(() => {
    const check = authLoading || userLoading
    setIsLoading(check)
  }, [authLoading, userLoading])

  return (
    <Loading loading={isLoading}/>
  )
}
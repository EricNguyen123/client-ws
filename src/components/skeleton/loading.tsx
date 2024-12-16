import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react'
import React from 'react'

type LoadingProps = { loading?: boolean; className?: string }

export default function Loading({ loading = false, className }: LoadingProps) {
  return (
    <>
      {loading && 
      <div className="w-screen h-screen fixed z-50 inset-0 bg-gray-100 bg-opacity-60 flex items-center justify-center">
        <span className={cn(`w-12 h-12 text-rose-300`, className)}>
          <Loader2 className={`w-full h-full animate-spin`} />
        </span>
      </div>}
    </>
  );
}

import React, { useState } from 'react'
import { Button } from '../ui/button';
import { Check, Copy } from 'lucide-react';

export default function BaseButtonCopy({ copy } : { copy: string}) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copy);
      setCopied(true);
      setTimeout(() => setCopied(false), 10000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleCopy}
      className={`${copied && "text-emerald-500"}`}
    >
      {copied ? <Check className="w-4 h-4"/> : <Copy className="w-4 h-4" />}
    </Button>
  )
}

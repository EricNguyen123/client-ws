/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Pipette } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";

export default function ColorPicker({ color, onChange }: { color: string; onChange: (color: string) => void }) {
  const [open, setOpen] = useState(false);
  const t = useTranslations("Account");

  const handleEyedropper = async () => {
    if (!("EyeDropper" in window)) {
      toast({
        title: t("products.error.title"),
        description: <div className="flex items-center justify-start">
          <Pipette className="mr-5 text-red-500"/>{t("products.error.description_3")}
        </div>,
      })
      return;
    }
    try {
      const eyeDropper = new (window as any).EyeDropper();
      const result = await eyeDropper.open();
      onChange(result.sRGBHex);
    } catch (error) {
      toast({
        title: t("products.error.title"),
        description: <div className="flex items-center justify-start">
          <Pipette className="mr-5 text-red-500"/>{t("products.error.description_2")}
        </div>,
      })
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          className="w-10 h-10 rounded-full border"
          style={{ backgroundColor: color }}
        />
      </PopoverTrigger>
      <PopoverContent className="w-[220px] flex flex-col items-center space-y-2">
        <HexColorPicker color={color} onChange={onChange} />
        <p className="text-sm font-medium">{color.toUpperCase()}</p>
        <Button variant="outline" className="flex items-center space-x-2" onClick={handleEyedropper}>
          <Pipette className="w-4 h-4" />
        </Button>
      </PopoverContent>
    </Popover>
  );
}

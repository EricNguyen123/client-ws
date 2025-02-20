/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Input } from "@/components/ui/input";
import { FileUp } from "lucide-react";
import { useTranslations } from "next-intl";

interface ImageUploadProps {
  variant?: "edit" | "create";
  imageFiles?: File[];
  handleSubmit?: (images: File[]) => void;
}

export default function InputFile({ 
  variant = "create",
  handleSubmit 
}: ImageUploadProps) {
  const t = useTranslations("Form");

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      handleSubmit && handleSubmit(fileArray);
    }
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (variant === "edit") return;

    const files = event.dataTransfer.files;
    if (files) {
      const fileArray = Array.from(files);
      handleSubmit && handleSubmit(fileArray);
    }
  };

  return (
      <div
        className={`border-2 border-dashed w-full h-48 rounded-lg cursor-pointer ${
          variant === "edit" ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
        }`}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer space-y-2">
          <FileUp className="w-8 h-8" />
          <span className="text-gray-600 text-base font-normal">{t("label.drag")}</span>
          <Input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
            disabled={variant === "edit"}
          />
        </label>
      </div>
  );
}

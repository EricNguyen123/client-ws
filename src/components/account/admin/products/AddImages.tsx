/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import InputFile from '@/components/form/InputFile'
import { toBase64 } from '@/utils';
import React, { useState } from 'react';
import Image from "next/image";
import { CircleCheck, Loader2, Minus, PencilOff } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { useDispatch, useSelector } from 'react-redux';
import { updateImage } from '@/store/products/actions';
import { Progress } from '@/components/ui/progress';
import { ErrorNumber } from '@/common/general';
import { toast } from '@/hooks/use-toast';

export default function AddImages() {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const t = useTranslations("Form");
  const tAccount = useTranslations("Account");
  const productsSelector = useSelector(({ product }: any) => product);
  const dispatch = useDispatch();
  const [uploadProgress, setUploadProgress] = useState<{[id: number]: number}>({});
  const loading = productsSelector?.loading;
  
  const handleFileChange = async (images: File[]) => {
    setImages(images);
    const base64Images = await Promise.all(images.map((file) => toBase64(file)));
    setPreviewUrls(base64Images);
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    const updatedPreviews = previewUrls.filter((_, i) => i !== index);

    setImages(updatedImages);
    setPreviewUrls(updatedPreviews);
  };

  const handleSubmit = async () => {
    for (let index = 0; index < images.length; index++) {
      const file = images[index];
      if(!productsSelector.newProduct.id) {
        toast({
          title: t("products.error.title"),
          description: <div className="flex items-center justify-start">
            <PencilOff className="mr-5 text-red-500"/>{tAccount("products.error.description_1")}
          </div>,
        })
        return;
      }
      await new Promise<void>((resolve) => {
        dispatch(updateImage({
          data: {
            image: file,
            itemId: productsSelector.newProduct.id,
            id: index,
          },
          setError: (error) => {
            if(error.status >= ErrorNumber.ErrorCode) {
              resolve();
            }
          },
          setSuccess: (success) => {
            if (success.status >= ErrorNumber.Success && success.status < ErrorNumber.Warning) {
              resolve();
            }
          },
          updateImageProgress: (data: { id: number, progress: number }) => {
            setUploadProgress((prev) => ({
              ...prev,
              [data.id]: data.progress,
            }));
          }
        }));
      });
    }
  };  
  
  return (
    <div className='w-full flex flex-col items-start justify-center space-y-4'>
      <InputFile
        handleSubmit={handleFileChange}
      />
      {previewUrls.length > 0 && Object.keys(uploadProgress).length < images.length && (
        <ScrollArea className="w-full whitespace-nowrap rounded-md border">
          <div className="flex w-max space-x-4 p-4">
            {previewUrls.map((url, index) => (
              <div key={index} className="relative w-36 h-24">
                <Image
                  src={url}
                  alt={`Preview ${index + 1}`}
                  className="rounded-md shadow-md"
                  layout="fill"
                  objectFit="cover"
                />
                {!uploadProgress[index] &&
                <div
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white text-xs p-1
                              rounded-full shadow-md hover:bg-red-600 cursor-pointer"
                >
                  <Minus className='w-4 h-4'/>
                </div>}
                {uploadProgress[index] > 0 && uploadProgress[index] !== 100 && (
                  <div className="w-full absolute bottom-1 right-0 flex items-center justify-center">
                    <Progress className="w-[80%]" value={uploadProgress[index]}/>
                  </div>
                )}
                {uploadProgress[index] === 100 && (
                  <div className="w-full absolute top-1/2 right-0 transform -translate-y-1/2 flex items-center justify-center text-emerald-500">
                    <CircleCheck className='w-8 h-8'/>
                  </div>
                )}
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      )}
      {images.length > 0 && 
      Object.keys(uploadProgress).length < images.length && 
        <Button 
          onClick={handleSubmit}
          variant={'default'}
          className='w-full'
          disabled={images.length === 0 || loading}
        >
          {loading && <Loader2 className="animate-spin" />}
          {t("button.submit")}
        </Button>}
    </div>
  )
}

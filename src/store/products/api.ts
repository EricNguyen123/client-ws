import { KeyTypes } from "@/common/general"
import { CreateProductProps, UploadImageProps } from "@/types"
import api from "@/utils/api"
import { AxiosResponse } from "axios"

export const createProductApi = (data: CreateProductProps): Promise<AxiosResponse> => {
  return api.post("/products", data)
}

export const updateImageApi = (data: UploadImageProps, onProgress: (progress: number) => void) => {
  const formData = new FormData();
  formData.append("file", data.image);

  return api.post(`/upload?id=${data.itemId}&key=${KeyTypes.Product}`, formData, {
    onUploadProgress: (progressEvent) => {
      if (progressEvent.total) {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress(progress);
      } else {
        onProgress(100); 
      }
    }});
};


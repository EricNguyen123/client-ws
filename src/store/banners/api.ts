import { AccountProps, SearchProps, UpdateBannerProps } from "@/types"
import api from "@/utils/api"
import { AxiosResponse } from "axios"

export const createBannerApi = (data: { formData: FormData }): Promise<AxiosResponse> => {
  console.log("data", data)
  return api.post("/banners", data.formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const searchBannersPaginationApi = (data: SearchProps): Promise<AxiosResponse> => {
  return api.get(`/banners/page?${data.keyword ? `keyword=${data.keyword}` : ""}&limit=${data.limit}&offset=${data.offset}`)
}

export const deleteBannerApi = (data: AccountProps): Promise<AxiosResponse> => {
  return api.delete(`/banners/delete/item?id=${data.id}`)
}

export const updateBannerApi = (data: UpdateBannerProps & AccountProps): Promise<AxiosResponse> => {
  return api.put(`/banners/update?id=${data.id}`, {
    descriptions: data.descriptions,
    number_order: data.orderNumber,
    start_date: data.startDate.toISOString(),
    end_date: data.endDate.toISOString(),
  })
}

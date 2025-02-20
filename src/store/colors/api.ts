import { AccountProps, CreateColorProps } from "@/types"
import api from "@/utils/api"
import { AxiosResponse } from "axios"

export const createColorApi = (data: CreateColorProps): Promise<AxiosResponse> => {
  return api.post("/color_types", data)
}

export const getColorsApi = (): Promise<AxiosResponse> => {
  return api.get("/color_types")
}

export const deleteColorApi = (data: AccountProps): Promise<AxiosResponse> => {
  return api.delete(`/color_types/delete/item?id=${data.id}`)
}

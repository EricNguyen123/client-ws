import images from "@/assets/images";
import { RoleEnum, StatusProductsEnum } from "@/common/general";

export const symbols = {
  inValid: "_",
  nonValue: "",
}

export const LIMIT = Number(process.env.NEXT_PUBLIC_LIMIT);

export const PAGE_INIT = 1;

export const ALL = "All";

export const roles = [
  {
    role: RoleEnum.Admin
  },
  {
    role: RoleEnum.Editor
  },
  {
    role: RoleEnum.User
  }
]

export const DEFAULT_IMAGE_URL = images.noImage.src;

export const statusProducts = {
  outOfBusiness: StatusProductsEnum.OutOfBusiness,
  onSale: StatusProductsEnum.OnSale,
  outOfStock: StatusProductsEnum.OutOfStock,
}

export const TIME_OUT_INTERVAL = 5;

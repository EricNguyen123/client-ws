/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, BannersPaginationData, CreateBannerData, DeleteBannerData, UpdateBannerData } from "@/types/redux";
import types from "./type";

export const createBanner = (data: CreateBannerData): Action => ({
  type: types.CREATE_BANNER,
  payload: data,
});

export const createBannerResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.CREATE_BANNER_SUCCESS : types.CREATE_BANNER_FAILED,
  payload: result,
});

export const getPageBanner = (data: BannersPaginationData): Action => ({
  type: types.GET_BANNERS,
  payload: data,
});

export const getPagerBannerResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.GET_BANNERS_SUCCESS : types.GET_BANNERS_FAILED,
  payload: result,
});

export const deleteBanner = (data: DeleteBannerData): Action => ({
  type: types.DELETE_BANNER,
  payload: data,
});

export const deleteBannerResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.DELETE_BANNER_SUCCESS : types.DELETE_BANNER_FAILED,
  payload: result,
});

export const updateBanner = (data: UpdateBannerData): Action => ({
  type: types.UPDATE_BANNER,
  payload: data,
});

export const updateBannerResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.UPDATE_BANNER_SUCCESS : types.UPDATE_BANNER_FAILED,
  payload: result,
});

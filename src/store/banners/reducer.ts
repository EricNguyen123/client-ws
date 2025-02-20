/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, BannersState } from "@/types/redux";
import types from "./type";

const initState = {
  loading: false,
  pages: {
    banners: undefined,
    totalBanners: 0,
    currentPage: 0,
  },
};

export default function bannersReducer(
  state: BannersState = initState,
  action: Action
) {
  switch (action.type) {
    case types.CREATE_BANNER: {
      return {
        ...state,
        loading: true,
      };
    }

    case types.CREATE_BANNER_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }

    case types.CREATE_BANNER_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }

    case types.GET_BANNERS: {
      return {
        ...state,
        loading: true,
      };
    }

    case types.GET_BANNERS_SUCCESS: {
      return {
        ...state,
        loading: false,
        pages: action.payload.data
      };
    }

    case types.GET_BANNERS_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }

    case types.DELETE_BANNER: {
      return {
        ...state,
        loading: true,
      };
    }

    case types.DELETE_BANNER_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }

    case types.DELETE_BANNER_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }

    case types.UPDATE_BANNER: {
      return {
        ...state,
        loading: true,
      };
    }

    case types.UPDATE_BANNER_SUCCESS: {
      console.log("action.payload.data", action.payload.data)
      return {
        ...state,
        loading: false,
        pages: {
          banners: state.pages.banners?.map((i: any) => {
            if (i.banner.id === action.payload.data.banner.id) {
              return action.payload.data;
            }
            return i;
          }),
          totalBanners: state.pages.totalBanners,
          currentPage: state.pages.currentPage,
        }
      };
    }

    case types.UPDATE_BANNER_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }

    default:
      return state;
  }
}

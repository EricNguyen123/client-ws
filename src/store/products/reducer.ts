/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, ProductsState } from "@/types/redux";
import types from "./type";

const initState = {
  loading: false,
  uploadImages: {},
  newProduct: undefined,
  pages: {
    products: undefined,
    totalProducts: 0,
    currentPage: 0,
  },
};

export default function productsReducer(
  state: ProductsState = initState,
  action: Action
) {
  switch (action.type) {
    case types.CREATE_PRODUCT: {
      return {
        ...state,
        loading: true,
      };
    }

    case types.CREATE_PRODUCT_SUCCESS: {
      return {
        ...state,
        newProduct: action.payload,
        loading: false,
      };
    }

    case types.CREATE_PRODUCT_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }

    case types.UPDATE_IMAGE: {
      return {
        ...state,
        loading: true,
      }
    }

    case types.UPDATE_IMAGE_SUCCESS: {
      const { id } = action.payload;
      return {
        ...state,
        loading: false,
        uploadImages: {
          ...state.uploadImages,
          [id]: { progress: 100 },
        },
      };
    }

    case types.UPDATE_IMAGE_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }

    default:
      return state;
  }
}

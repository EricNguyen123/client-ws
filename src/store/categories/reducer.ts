/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, CategoriesState } from "@/types/redux";
import types from "./type";

const initState = {
  loading: false,
  pages: {
    categories: undefined,
    totalUsers: 0,
    currentPage: 0,
  },
  categories: undefined,
};

export default function categoriesReducer(
  state: CategoriesState = initState,
  action: Action
) {
  switch (action.type) {
    case types.GET_CATEGORIES: {
      return {
        ...state,
        loading: true,
      };
    }

    case types.GET_CATEGORIES_SUCCESS: {
      return {
        ...state,
        loading: false,
        pages: action.payload.data
      };
    }

    case types.GET_CATEGORIES_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }

    case types.CREATE_CATEGORY: {
      return {
        ...state,
        loading: true,
      };
    }

    case types.CREATE_CATEGORY_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }

    case types.CREATE_CATEGORY_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }

    case types.GET_ALL_CATEGORIES: {
      return {
        ...state,
        loading: true,
      };
    }

    case types.GET_ALL_CATEGORIES_SUCCESS: {
      return {
        ...state,
        loading: false,
        categories: action.payload.data
      };
    }

    case types.GET_ALL_CATEGORIES_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }

    case types.UPDATE_CATEGORY: {
      return {
        ...state,
        loading: true,
      };
    }

    case types.UPDATE_CATEGORY_SUCCESS: {      
      return {
        ...state,
        loading: false,
        
      };
    }

    case types.UPDATE_CATEGORY_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }

    case types.DELETE_CATEGORY: {
      return {
        ...state,
        loading: true,
      };
    }

    case types.DELETE_CATEGORY_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }

    case types.DELETE_CATEGORY_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }

    default:
      return state;
  }
}

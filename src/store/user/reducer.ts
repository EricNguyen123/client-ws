/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, UserState } from "@/types/redux";
import types from "./type";

const initState = {
  loading: false,
  userInfo: undefined,
  pages: {
    users: undefined,
    totalUsers: 0,
    currentPage: 0,
  },
  statistical: undefined,
};

export default function userReducer(
  state: UserState = initState,
  action: Action
) {
  switch (action.type) {
    case types.UPDATE_ACCOUNT: {
      return {
       ...state,
        loading: true,
      };
    }

    case types.UPDATE_ACCOUNT_SUCCESS: {
      return {
        ...state,
        loading: false,
        userInfo: action.payload.data || undefined,
      };
    }

    case types.UPDATE_ACCOUNT_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }

    case types.CHANGE_PASSWORD: {
      return {
       ...state,
        loading: true,
      };
    }

    case types.CHANGE_PASSWORD_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }

    case types.CHANGE_PASSWORD_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }

    case types.SEARCH_USERS_PAGINATION: {
      return {
       ...state,
        loading: true,
      };
    }

    case types.SEARCH_USERS_PAGINATION_SUCCESS: {
      return {
        ...state,
        loading: false,
        pages: action.payload.data,
      };
    }

    case types.SEARCH_USERS_PAGINATION_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }

    case types.STATISTICAL_USERS: {
      return {
       ...state,
        loading: true,
      };
    }

    case types.STATISTICAL_USERS_SUCCESS: {
      return {
        ...state,
        loading: false,
        statistical: action.payload.data,
      };
    }

    case types.STATISTICAL_USERS_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }

    case types.CREATE: {
      return {
       ...state,
        loading: true,
      };
    }

    case types.CREATE_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }

    case types.CREATE_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }

    case types.DELETE_USERS: {
      return {
       ...state,
        loading: true,
      };
    }

    case types.DELETE_USERS_SUCCESS: {
      return {
        ...state,
        loading: false,
        pages: {
          users: state.pages.users?.filter(
            (user: any) => !action.payload.data.ids.includes(user.id) 
          ),
          totalUsers: state.pages.totalUsers - action.payload.data.ids.length,
          currentPage: state.pages.currentPage,
        }
      };
    }

    case types.DELETE_USERS_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }

    case types.DELETE_USER: {
      return {
       ...state,
        loading: true,
      };
    }

    case types.DELETE_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        pages: {
          users: state.pages.users?.filter(
            (user: any) => user.id !== action.payload.data.id
          ),
          totalUsers: state.pages.totalUsers - 1,
          currentPage: state.pages.currentPage,
        }
      };
    }

    case types.DELETE_USER_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }

    case types.UPDATE_USER: {
      return {
        ...state,
        loading: false,
        userInfo: action.payload.data || undefined,
      };
    }
    default:
      return state;
  }
}

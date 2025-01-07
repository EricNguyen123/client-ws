import { Action, AuthState } from "@/types/redux";
import types from "./type";

const initState = {
  loading: false,
  userInfo: undefined,
  authenticated: false,
  registered: false,
  otp: undefined,
};

export default function authReducer(
  state: AuthState = initState,
  action: Action
) {
  switch (action.type) {
    case types.REGISTER: {
      return {
       ...state,
        loading: true,
      };
    }

    case types.REGISTER_SUCCESS: {
      return {
        ...state,
        loading: false,
        authenticated: false,
        userInfo: action.payload.data || undefined,
        registered: true,
      };
    }

    case types.REGISTER_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }

    case types.LOGIN: {
      return { ...state, loading: true };
    }

    case types.LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        userInfo: action.payload.data?.user || undefined,
        authenticated: true,
      };
    }

    case types.LOGIN_FAILED: {
      return { ...state, loading: false };
    }

    case types.LOGIN_WITH_GOOGLE: {
      return { ...state, loading: true };
    }

    case types.LOGIN_WITH_GOOGLE_SUCCESS: {
      return {
        ...state,
        loading: false,
        userInfo: action.payload.data?.user || undefined,
        authenticated: true,
      };
    }

    case types.LOGIN_WITH_GOOGLE_FAILED: {
      return { ...state, loading: false };
    }

    case types.LOGOUT_SUCCESS: {
      return initState;
    }

    case types.UPDATE_AUTH: {
      return state.userInfo.id === action.payload.data.id ? {
        ...state,
        loading: false,
        userInfo: action.payload.data || undefined,
        authenticated: true,
      } : { ...state, loading: false };
    }

    case types.FORGOT_PASSWORD: {
      return { ...state, loading: true };
    }

    case types.FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        loading: false,
        otp: action.payload.data || undefined,
      };
    }

    case types.FORGOT_PASSWORD_FAILED: {
      return { ...state, loading: false };
    }

    case types.VERIFY_OTP: {
      return { ...state, loading: true };
    }

    case types.VERIFY_OTP_SUCCESS: {
      return {
        ...state,
        loading: false,
        otp: action.payload.data || undefined,
      };
    }

    case types.VERIFY_OTP_FAILED: {
      return { ...state, loading: false };
    }

    case types.CHANGE_FORGOT_PASSWORD: {
      return {
       ...state,
        loading: true,
      };
    }

    case types.CHANGE_FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }

    case types.CHANGE_FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }

    default:
      return state;
  }
}

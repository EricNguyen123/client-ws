/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, ColorsState } from "@/types/redux";
import types from "./type";

const initState = {
  loading: false,
  colors: undefined,
};

export default function colorsReducer(
  state: ColorsState = initState,
  action: Action
) {
  switch (action.type) {
    case types.CREATE_COLOR: {
      return {
        ...state,
        loading: true,
      };
    }

    case types.CREATE_COLOR_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }

    case types.CREATE_COLOR_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }

    case types.GET_ALL_COLORS: {
      return {
        ...state,
        loading: true,
      };
    }

    case types.GET_ALL_COLORS_SUCCESS: {
      return {
        ...state,
        loading: false,
        colors: action.payload,
      };
    }

    case types.GET_ALL_COLORS_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }

    case types.DELETE_COLOR: {
      return {
        ...state,
        loading: true,
      };
    }

    case types.DELETE_COLOR_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }

    case types.DELETE_COLOR_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }

    default:
      return state;
  }
}

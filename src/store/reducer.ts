/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  TypedUseSelectorHook,
  useSelector as rawUseSelector,
} from "react-redux";
import { combineReducers } from "redux";
import authReducer from "./auth/reducer";
// import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/lib/persistReducer";
import storage from "@/utils/customStorage";
import userReducer from "./user/reducer";

const rootPersistConfig = {
  key: "root",
  storage,
  blacklist: [
    "auth",
  ],
};

const authPersistConfig = {
  key: "auth",
  storage,
  blacklist: ["loading"],
};

const reducers = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  user: userReducer,
});

type RootState = ReturnType<typeof reducers>;
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;

const rootReducer = (state: any, action: any) => {
  return reducers(state, action);
};

export default persistReducer(
  rootPersistConfig,
  persistReducer(rootPersistConfig, rootReducer)
);
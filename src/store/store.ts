import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { persistStore } from "redux-persist";
import rootSaga from './rootSaga'
import reducers from "./reducer";

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
  devTools: process.env.NEXT_PUBLIC_ENV !== "production",
})

const persistor = typeof window !== "undefined" ? persistStore(store) : null;

sagaMiddleware.run(rootSaga);
export type RootState = ReturnType<typeof store.getState>;
export { persistor, store };

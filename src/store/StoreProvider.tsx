'use client'

import { persistor, store } from './store'
import { Provider } from 'react-redux'

import React from 'react'
import { PersistGate } from 'redux-persist/integration/react'

export const StoreProvider = ({children}: {children: React.ReactNode}) => {
  return (
    <Provider store={store}>
      {typeof window !== "undefined" && persistor ? (
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      ) : (
        <>{children}</>
      )}
    </Provider>
  )
}

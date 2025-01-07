'use client';

import { createContext, useContext } from 'react';

interface UseContextType {
  id?: string;
}

const UseContext = createContext<UseContextType>({});

export const useCusContext = () => useContext(UseContext);

export default UseContext;

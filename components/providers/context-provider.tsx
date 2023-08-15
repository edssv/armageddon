'use client';

import { createContext, Dispatch, SetStateAction } from 'react';
import { Asteroid } from '@/services/asteroid/asteroid.helper';

import useLocalStorage from '@/lib/hooks/use-local-storage';

export const AppContext = createContext<{
  cart: Asteroid[];
  setCart: any;
}>({
  cart: [],
  setCart: () => [],
});

export function ContextProvider({ children }: React.PropsWithChildren) {
  const [cart, setCart] = useLocalStorage<Asteroid[]>('cart', []);

  return (
    <AppContext.Provider
      value={{
        cart,
        setCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

import { createContext, useContext } from 'react';

export const useContextFactory = <T,>(contextName: string = 'useMyContext') => {
  const Context = createContext<T | null>(null);

  const useMyContext = () => {
    const context = useContext(Context);

    if (context === null) {
      throw new Error(`${contextName} must be used within a ProviderProvider`);
    }

    return context;
  };

  const useMyContextWithoutFallback = () => {
    return useContext(Context);
  };

  return { Context, useMyContext, useMyContextWithoutFallback };
};

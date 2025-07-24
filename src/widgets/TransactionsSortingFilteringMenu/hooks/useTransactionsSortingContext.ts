import { createContext, Dispatch, SetStateAction, useContext } from 'react';
import { TransactionsSortingOrderType } from 'widgets/TransactionsSortingFilteringMenu/types/TransactionsSortingOrderType.ts';

type TransactionsSortingContextType =
  | {
      sortingOrder: TransactionsSortingOrderType;
      setSortingOrder: Dispatch<SetStateAction<TransactionsSortingOrderType>>;
    }
  | {
      sortingOrder: undefined;
      setSortingOrder: undefined;
    };

export const TransactionsSortingContext = createContext<TransactionsSortingContextType | null>(null);

export const useTransactionsSortingContext = () => {
  const context = useContext(TransactionsSortingContext);

  if (!context) {
    throw new Error('useTransactionsSortingContext must be used within TransactionsSortingContext.Provider');
  }

  return context;
};

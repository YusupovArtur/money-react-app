import { createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useState } from 'react';
import { TransactionsSortingOrderType } from 'widgets/TransactionsSortingFilteringMenu/types/TransactionsSortingOrderType.ts';

type SortContextType = {
  sortingOrder: TransactionsSortingOrderType;
  setSortingOrder: Dispatch<SetStateAction<TransactionsSortingOrderType>>;
};

const TransactionsPageSortContext = createContext<SortContextType | null>(null);

export const TransactionsPageSortContextProvider: FC<{
  children: ReactNode;
  initialState?: TransactionsSortingOrderType;
}> = ({ children, initialState }) => {
  const [sortingOrder, setSortingOrder] = useState<TransactionsSortingOrderType>(initialState || { key: 'time', order: 'desc' });

  return (
    <TransactionsPageSortContext.Provider value={{ sortingOrder: sortingOrder, setSortingOrder: setSortingOrder }}>
      {children}
    </TransactionsPageSortContext.Provider>
  );
};

export const useTransactionsPageSortContext = () => {
  const context = useContext(TransactionsPageSortContext);

  if (!context) {
    throw new Error('useMainPageFilterContext must be used within MainPageFilterContextProvider');
  }

  return context;
};

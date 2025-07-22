import { createContext, FC, ReactNode, useContext, useState } from 'react';
import { TransactionsFilterType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/types/TransactionsFilterType.ts';
import { TransactionType } from 'store/slices/transactionsSlice';
import { FilterContextType } from 'app/hooks/useAppContext/FilterContextType.ts';

const TransactionsPageFilterContext = createContext<FilterContextType | null>(null);

export const TransactionsPageFilterContextProvider: FC<{
  children: ReactNode;
  initialState?: TransactionsFilterType<keyof TransactionType>[];
}> = ({ children, initialState }) => {
  const [filters, setFilters] = useState<TransactionsFilterType<keyof TransactionType>[]>(initialState || []);

  return (
    <TransactionsPageFilterContext.Provider value={{ filters: filters, setFilters: setFilters }}>
      {children}
    </TransactionsPageFilterContext.Provider>
  );
};

export const useTransactionsPageFilterContext = () => {
  const context = useContext(TransactionsPageFilterContext);

  if (!context) {
    throw new Error('useMainPageFilterContext must be used within MainPageFilterContextProvider');
  }

  return context;
};

import { createContext, FC, ReactNode, useContext, useState } from 'react';
import { TransactionsFilterType } from 'widgets/TransactionsSortingFilteringMenu/types/TransactionsFilterType.ts';
import { TransactionType } from 'store/slices/transactionsSlice';
import { FilterContextType } from 'app/hooks/useAppContext/FilterContextType.ts';

const MainPagePieChartFilterContext = createContext<FilterContextType | null>(null);

export const MainPagePieChartFilterContextProvider: FC<{
  children: ReactNode;
  initialState?: TransactionsFilterType<keyof TransactionType>[];
}> = ({ children, initialState }) => {
  const [filters, setFilters] = useState<TransactionsFilterType<keyof TransactionType>[]>(initialState || []);

  return (
    <MainPagePieChartFilterContext.Provider value={{ filters: filters, setFilters: setFilters }}>
      {children}
    </MainPagePieChartFilterContext.Provider>
  );
};

export const useMainPagePieChartFilterContext = () => {
  const context = useContext(MainPagePieChartFilterContext);

  if (!context) {
    throw new Error('useMainPageFilterContext must be used within MainPageFilterContextProvider');
  }

  return context;
};

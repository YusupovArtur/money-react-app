import { FC, ReactNode, useState } from 'react';
import { TransactionsFilterType } from 'widgets/TransactionsSortingFilteringMenu/types/TransactionsFilterType.ts';
import { TransactionType } from 'store/slices/transactionsSlice';
import { FilterContextType } from 'app/hooks/useAppContext/FilterContextType.ts';
import { useContextFactory } from 'shared/hooks/useContextFactory.tsx';

const { Context, useMyContext: useTransactionsPageFilterContext } = useContextFactory<FilterContextType>(
  'useTransactionsPageFilterContext',
);
export { useTransactionsPageFilterContext };

export const TransactionsPageFilterContextProvider: FC<{
  children: ReactNode;
  initialState?: TransactionsFilterType<keyof TransactionType>[];
}> = ({ children, initialState }) => {
  const [filters, setFilters] = useState<TransactionsFilterType<keyof TransactionType>[]>(initialState || []);

  return <Context.Provider value={{ filters: filters, setFilters: setFilters }}>{children}</Context.Provider>;
};

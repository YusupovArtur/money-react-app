import { Dispatch, FC, ReactNode, SetStateAction, useState } from 'react';
import { TransactionsSortingOrderType } from 'widgets/TransactionsSortingFilteringMenu/types/TransactionsSortingOrderType.ts';
import { useContextFactory } from 'shared/hooks/useContextFactory.tsx';

type TransactionsPageSortContextType = {
  sortingOrder: TransactionsSortingOrderType;
  setSortingOrder: Dispatch<SetStateAction<TransactionsSortingOrderType>>;
};

const { Context, useMyContext: useTransactionsPageSortContext } =
  useContextFactory<TransactionsPageSortContextType>('useTransactionsPageSortContext');
export { useTransactionsPageSortContext };

export const TransactionsPageSortContextProvider: FC<{
  children: ReactNode;
  initialState?: TransactionsSortingOrderType;
}> = ({ children, initialState }) => {
  const [sortingOrder, setSortingOrder] = useState<TransactionsSortingOrderType>(initialState || { key: 'time', order: 'desc' });

  return <Context.Provider value={{ sortingOrder: sortingOrder, setSortingOrder: setSortingOrder }}>{children}</Context.Provider>;
};

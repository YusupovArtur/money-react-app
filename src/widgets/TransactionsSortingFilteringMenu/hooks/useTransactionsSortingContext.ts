import { Dispatch, SetStateAction } from 'react';
import { TransactionsSortingOrderType } from 'widgets/TransactionsSortingFilteringMenu/types/TransactionsSortingOrderType.ts';
import { useContextFactory } from 'shared/hooks/useContextFactory.tsx';

type TransactionsSortingContextType = {
  sortingOrder: TransactionsSortingOrderType;
  setSortingOrder: Dispatch<SetStateAction<TransactionsSortingOrderType>>;
};

const { Context: TransactionsSortingContext, useMyContextWithoutFallback: useTransactionsSortingContext } =
  useContextFactory<TransactionsSortingContextType>('useTransactionsSortingContext');

export { TransactionsSortingContext, useTransactionsSortingContext };

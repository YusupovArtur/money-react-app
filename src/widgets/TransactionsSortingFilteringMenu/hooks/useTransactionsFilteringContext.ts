import { Dispatch, SetStateAction } from 'react';
import { TransactionType, TransactionsListType } from 'store/slices/transactionsSlice';
import { TransactionsFilterType } from 'widgets/TransactionsSortingFilteringMenu/types/TransactionsFilterType.ts';
import { FiltrationCalculationsObjectType } from 'widgets/TransactionsSortingFilteringMenu/helpers/getFiltrationCalculationsObject.ts';
import { useContextFactory } from 'shared/hooks/useContextFactory.tsx';

interface TransactionsFilterContextType extends Omit<FiltrationCalculationsObjectType, 'filteredOrder'> {
  transactions: TransactionsListType;
  filters: TransactionsFilterType<keyof TransactionType>[];
  setFilters: Dispatch<SetStateAction<TransactionsFilterType<keyof TransactionType>[]>>;
}

const { Context: TransactionsFilteringContext, useMyContext: useTransactionsFilteringContext } =
  useContextFactory<TransactionsFilterContextType>('useTransactionsFilteringContext');

export { TransactionsFilteringContext, useTransactionsFilteringContext };

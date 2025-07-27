import { TransactionsFilterType } from 'widgets/TransactionsSortingFilteringMenu/types/TransactionsFilterType.ts';
import { TransactionType } from 'store/slices/transactionsSlice';
import { Dispatch, SetStateAction } from 'react';

export type FilterContextType = {
  filters: TransactionsFilterType<keyof TransactionType>[];
  setFilters: Dispatch<SetStateAction<TransactionsFilterType<keyof TransactionType>[]>>;
};

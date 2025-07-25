import { createContext, Dispatch, SetStateAction, useContext } from 'react';
import { TransactionType, TransactionsListType } from 'store/slices/transactionsSlice';
import { TransactionsFilterType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/types/TransactionsFilterType.ts';
import { FiltrationCalculationsObjectType } from 'pages/TransactionsPage/widgets/TransactionsSorterAndFilter/helpers/getFiltrationCalculationsObject.ts';

interface TransactionsFilterContextType extends Omit<FiltrationCalculationsObjectType, 'filteredOrder'> {
  transactions: TransactionsListType;
  filters: TransactionsFilterType<keyof TransactionType>[];
  setFilters: Dispatch<SetStateAction<TransactionsFilterType<keyof TransactionType>[]>>;
}

export const TransactionsFilteringContext = createContext<TransactionsFilterContextType | null>(null);

export const useTransactionsFilteringContext = () => {
  const context = useContext(TransactionsFilteringContext);

  if (!context) {
    throw new Error('useTransactionsFilteringContext must be used within TransactionsProvider');
  }

  return context;
};

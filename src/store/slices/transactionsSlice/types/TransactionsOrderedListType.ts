import { TransactionsListType } from 'store/slices/transactionsSlice';

export type TransactionsOrderedListType = {
  list: TransactionsListType;
  order: string[];
};

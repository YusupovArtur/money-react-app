import { TransactionType } from 'store/slices/transactionsSlice';

export type TransactionsSortingOrderType = {
  key: keyof TransactionType;
  order: 'asc' | 'desc';
};

import { TransactionType } from 'store/slices/transactionsSlice';

export type RangeFilterType = { max: number; min: number };

type FilterType<T extends keyof TransactionType> = T extends
  | 'type'
  | 'fromWallet'
  | 'toWallet'
  | 'category'
  | 'subcategory'
  | 'description'
  ? Set<TransactionType[T]> | null
  : T extends 'time' | 'sum'
    ? Set<TransactionType[T]> | RangeFilterType | null
    : never;

export type TransactionsFilterType<T extends keyof TransactionType> = {
  key: T;
  filter: FilterType<T>;
};

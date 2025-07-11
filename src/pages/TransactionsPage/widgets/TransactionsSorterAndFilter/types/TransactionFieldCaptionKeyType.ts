import { TransactionType } from 'store/slices/transactionsSlice';

export type TransactionFieldCaptionKeyType<T extends keyof TransactionType> = T extends
  | 'time'
  | 'type'
  | 'fromWallet'
  | 'toWallet'
  | 'category'
  | 'description'
  ? TransactionType[T]
  : T extends 'sum'
    ? { sum: number; type: TransactionType['type'] }
    : T extends 'subcategory'
      ? { categoryID: string; subcategoryID: string }
      : never;

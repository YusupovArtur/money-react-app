import { TransactionType } from 'store/slices/transactionsSlice';

export type TransactionFieldCaptionKeyType<T extends keyof TransactionType> = T extends
  | 'time'
  | 'type'
  | 'fromWallet'
  | 'toWallet'
  | 'description'
  ? TransactionType[T]
  : T extends 'sum'
    ? { sum: number; type: TransactionType['type'] }
    : T extends 'category'
      ? { type: TransactionType['type']; categoryID: string }
      : T extends 'subcategory'
        ? { type: TransactionType['type']; categoryID: string; subcategoryID: string }
        : never;

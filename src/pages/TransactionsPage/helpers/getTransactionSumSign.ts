import { TransactionType } from 'store/slices/transactionsSlice';

export const getTransactionSumSign = (type: TransactionType['type']) => {
  return type === 'transfer' ? undefined : type === 'expense' ? 'negative' : 'positive';
};

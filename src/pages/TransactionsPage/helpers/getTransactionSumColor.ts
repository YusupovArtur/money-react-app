import { TransactionType } from 'store/slices/transactionsSlice';

export const getTransactionSumColor = (type: TransactionType['type']) => {
  return type === 'expense' ? 'text-danger' : type === 'income' ? 'text-success' : '';
};

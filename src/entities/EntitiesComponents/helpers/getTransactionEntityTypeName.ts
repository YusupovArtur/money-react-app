import { TransactionType } from 'store/slices/transactionsSlice';

export const getTransactionEntityTypeName = (type: TransactionType['type']): string => {
  switch (type) {
    case 'expense':
      return 'Расход';
    case 'income':
      return 'Доход';
    case 'transfer':
      return 'Перевод';
    default:
      return '';
  }
};

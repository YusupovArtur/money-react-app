import { TransactionType } from 'store/slices/transactionsSlice';

export const getTypeCaption = (type: TransactionType['type'], ending: string = ''): string => {
  switch (type) {
    case 'expense':
      return 'Расход' + ending;
    case 'income':
      return 'Доход' + ending;
    case 'transfer':
      return 'Перевод' + ending;
    default:
      return '';
  }
};

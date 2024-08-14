import { CategoryType } from 'store/slices/categoriesSlice';

export const getCategoryTypeName = (type: CategoryType['type']): string => {
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

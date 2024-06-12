export const getCategoryTypeName = (typeName: 'expense' | 'income' | 'transfer'): string => {
  switch (typeName) {
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

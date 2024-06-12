export const getStringSum = (sum: number): string => {
  return sum
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$& ')
    .replace('.', ',');
};

export const getWalletTypeName = (typeName: 'debit' | 'credit' | 'investment'): string => {
  switch (typeName) {
    case 'debit':
      return 'Дебетовый';
    case 'investment':
      return 'Инвестиционный';
    case 'credit':
      return 'Кредитовый';
    default:
      return '';
  }
};

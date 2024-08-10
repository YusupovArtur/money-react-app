import { WalletType } from 'store/slices/walletsSlice';

export const getWalletTypeName = (type: WalletType['type']): string => {
  switch (type) {
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

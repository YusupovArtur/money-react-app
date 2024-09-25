import { RootState } from 'store/store.ts';
import { selectWallet, WalletType } from 'store/slices/walletsSlice';

const defaultProps = {
  type: 'debit' as WalletType['type'],
  balance: 0,
  color: '',
  description: '',
};
const defaultWithID: WalletType = {
  name: 'Неизвестный счет',
  iconName: 'Exclamation',
  ...defaultProps,
};
const defaultWithoutID: WalletType = {
  name: 'Счет не выбран',
  iconName: 'Question',
  ...defaultProps,
};

export const selectDisplayedWallet = (id: string | null) => {
  return (state: RootState): WalletType => {
    const wallet = selectWallet(id)(state);

    if (wallet) {
      return wallet;
    }

    if (id) {
      return defaultWithID;
    } else {
      return defaultWithoutID;
    }
  };
};

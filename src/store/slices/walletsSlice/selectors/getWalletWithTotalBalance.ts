import { WalletType } from 'store/slices/walletsSlice';

export const getWalletWithTotalBalance = (props: { wallet: WalletType | undefined; total: number }): WalletType | undefined => {
  const { wallet, total } = props;

  if (!wallet) {
    return undefined;
  }

  if (!total) {
    return wallet;
  }

  return { ...wallet, balance: wallet.balance + total };
};

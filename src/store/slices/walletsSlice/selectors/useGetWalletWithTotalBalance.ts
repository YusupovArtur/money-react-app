import { useAppSelector } from 'store/store.ts';
import { selectWallet, WalletType } from 'store/slices/walletsSlice';
import { selectWalletTransactionsTotal } from 'store/slices/transactionsSlice';

export const useGetWalletWithTotalBalance = (
  id: string | null,
): {
  walletWithTotalBalance: WalletType | undefined;
  walletForUseEffect: WalletType | undefined;
  totalForUseEffect: number;
} => {
  const wallet = useAppSelector(selectWallet(id));

  if (!wallet) {
    return { walletWithTotalBalance: undefined, walletForUseEffect: undefined, totalForUseEffect: 0 };
  }

  const total = useAppSelector(selectWalletTransactionsTotal(id));
  if (!total) {
    return { walletWithTotalBalance: wallet, walletForUseEffect: wallet, totalForUseEffect: total };
  }

  return {
    walletWithTotalBalance: wallet,
    walletForUseEffect: { ...wallet, balance: wallet.balance + total },
    totalForUseEffect: total,
  };
};

import { RootState } from 'store/store.ts';
import { WalletType } from 'store/slices/walletsSlice';

export const selectWallet = (id: string | null) => {
  return (state: RootState): WalletType | undefined => {
    if (id) {
      return state.wallets.list[id] || undefined;
    } else {
      return undefined;
    }
  };
};

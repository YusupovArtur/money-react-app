import { createSelector } from 'reselect';
import { RootState } from 'store/store.ts';
import { deepEqual } from 'shared/helpers';

const selectWallet = (state: RootState, id: string | null) => {
  if (!id) return undefined;
  return state.wallets.list[id] || undefined;
};

const selectTotal = (state: RootState, id: string | null) => {
  if (!id) return 0;
  return state.transactions.walletsTransactionsTotals[id] || 0;
};

export const reselectWalletWithTotalBalance = createSelector(
  [selectWallet, selectTotal],
  (wallet, total) => {
    if (!wallet) {
      return undefined;
    }

    if (!total) {
      return wallet;
    }

    return { ...wallet, balance: wallet.balance + total };
  },
  {
    memoizeOptions: {
      resultEqualityCheck: deepEqual,
    },
  },
);

export const selectWalletWithTotalBalance = (id: string | null) => {
  return (state: RootState) => reselectWalletWithTotalBalance(state, id);
};

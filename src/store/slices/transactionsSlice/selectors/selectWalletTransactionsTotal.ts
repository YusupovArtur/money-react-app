import { RootState } from 'store/store.ts';

export const selectWalletTransactionsTotal = (id: string | null) => {
  return (state: RootState): number => {
    if (!id) {
      return 0;
    }

    return state.transactions.walletsTransactionsTotals[id] || 0;
  };
};

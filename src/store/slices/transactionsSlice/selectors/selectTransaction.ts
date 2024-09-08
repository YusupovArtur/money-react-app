import { RootState } from 'store/store.ts';
import { TransactionType } from 'store/slices/transactionsSlice';

export const selectTransaction = (id: string | null) => {
  return (state: RootState): TransactionType | undefined => {
    if (id) {
      return state.transactions.list[id] || undefined;
    } else {
      return undefined;
    }
  };
};
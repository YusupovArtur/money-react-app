import { RootState } from 'store/store.ts';

export const selectWalletsList = (state: RootState) => state.wallets.list;

import { RootState } from 'store/store.ts';

export const selectWalletsOrder = (state: RootState) => state.wallets.order;

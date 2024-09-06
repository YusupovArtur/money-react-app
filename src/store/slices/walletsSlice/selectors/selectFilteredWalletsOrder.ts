import { createSelector } from 'reselect';
import { RootState } from 'store/store';
import { selectWalletsList, selectWalletsOrder, WalletType } from 'store/slices/walletsSlice';

const selectFiltered = createSelector(
  [selectWalletsList, selectWalletsOrder, (_, filter: WalletType['type'] | null | undefined) => filter],
  (list, order, filter) => {
    if (!filter) {
      return order;
    }

    return order.filter((id) => list[id]?.type === filter);
  },
);

export const selectFilteredWalletsOrder = (filter: WalletType['type'] | null | undefined) => {
  return (state: RootState) => selectFiltered(state, filter);
};

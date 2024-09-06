import { createSelector } from 'reselect';
import { RootState } from 'store/store';
import { CategoryType, selectCategoriesList, selectCategoriesOrder } from 'store/slices/categoriesSlice';

const selectFilteredOrder = createSelector(
  [selectCategoriesList, selectCategoriesOrder, (_, filter: CategoryType['type'] | null | undefined) => filter],
  (list, order, filter) => {
    if (!filter) {
      return [...order];
    }

    return [...order.filter((id) => list[id]?.type === filter)];
  },
);

export const selectFilteredCategoriesOrder = (filter: CategoryType['type'] | null | undefined) => {
  return (state: RootState) => selectFilteredOrder(state, filter);
};

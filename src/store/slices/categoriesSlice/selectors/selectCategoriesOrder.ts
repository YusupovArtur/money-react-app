import { RootState } from 'store/store.ts';

export const selectCategoriesOrder = (state: RootState) => state.categories.order;

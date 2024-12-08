import { RootState } from 'store/store.ts';

export const selectCategoriesList = (state: RootState) => state.categories.list;

import { RootState } from 'store/store.ts';
import { CategoryType } from 'store/slices/categoriesSlice';

export const selectCategory = (id: string | null) => {
  return (state: RootState): CategoryType | undefined => {
    if (!id) {
      return undefined;
    }

    return state.categories.list[id] || undefined;
  };
};

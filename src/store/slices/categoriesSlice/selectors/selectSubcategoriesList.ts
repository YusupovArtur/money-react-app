import { RootState } from 'store/store.ts';
import { SubcategoriesListType } from 'store/slices/categoriesSlice';

export const selectSubcategoriesList = (categoryID: string | null) => {
  return (state: RootState): SubcategoriesListType | undefined => {
    if (categoryID) {
      const category = state.categories.list[categoryID] ? state.categories.list[categoryID] : undefined;

      if (category) {
        return category.subcategories.list || undefined;
      } else {
        return undefined;
      }
    } else {
      return undefined;
    }
  };
};

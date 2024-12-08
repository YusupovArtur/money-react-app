import { RootState } from 'store/store.ts';

export const selectSubcategoriesOrder = (categoryID: string | null) => {
  return (state: RootState): string[] | undefined => {
    if (categoryID) {
      const category = state.categories.list[categoryID] ? state.categories.list[categoryID] : undefined;

      if (category) {
        return category.subcategories.order || undefined;
      } else {
        return undefined;
      }
    } else {
      return undefined;
    }
  };
};

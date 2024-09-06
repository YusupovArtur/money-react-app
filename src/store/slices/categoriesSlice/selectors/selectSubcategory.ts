import { RootState } from 'store/store.ts';
import { selectCategory, SubcategoryType } from 'store/slices/categoriesSlice';

export const selectSubcategory = (props: { categoryID: string | null; subcategoryID: string | null }) => {
  return (state: RootState): SubcategoryType | undefined => {
    const { categoryID, subcategoryID } = props;

    if (!subcategoryID) {
      return undefined;
    }

    const category = selectCategory(categoryID)(state);
    if (!category) {
      return undefined;
    }

    return category.subcategories.list[subcategoryID] || undefined;
  };
};

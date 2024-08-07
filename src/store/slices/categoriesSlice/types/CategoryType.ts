import { SubcategoriesOrderedListType } from 'store/slices/categoriesSlice';

export type CategoryType = {
  name: string;
  iconName: string;
  color: string;
  description: string;
  type: 'expense' | 'income' | 'transfer';
  subcategories: SubcategoriesOrderedListType;
};

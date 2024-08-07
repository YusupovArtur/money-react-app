import { SubcategoriesOrderedListType } from './SubcategoriesOrderedListType.ts';

export type CategoryType = {
  name: string;
  iconName: string;
  color: string;
  description: string;
  type: 'expense' | 'income' | 'transfer';
  subcategories: SubcategoriesOrderedListType;
};

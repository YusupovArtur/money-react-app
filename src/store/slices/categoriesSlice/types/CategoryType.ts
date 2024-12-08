import { SubcategoriesOrderedListType } from 'store/slices/categoriesSlice';
import { TransactionType } from 'store/slices/transactionsSlice';

export type CategoryType = {
  name: string;
  iconName: string;
  color: string;
  description: string;
  type: TransactionType['type'];
  subcategories: SubcategoriesOrderedListType;
};

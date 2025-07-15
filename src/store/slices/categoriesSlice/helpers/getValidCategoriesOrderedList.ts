import { QuerySnapshot } from 'firebase/firestore';
import { CategoriesListType, CategoriesOrderedListType, CategoryType, SubcategoryType } from 'store/slices/categoriesSlice';
import { getValidOrder } from 'store/helpers/getValidOrder.ts';
import { isArrayOfStrings } from 'shared/helpers';

const defaultCategory: CategoryType = {
  type: 'expense',
  name: '',
  iconName: '',
  color: '',
  description: '',
  subcategories: {
    order: [],
    list: {},
  },
};

const isSubcategory = (obj: any): obj is SubcategoryType => {
  return (
    obj &&
    typeof obj === 'object' &&
    typeof obj.name === 'string' &&
    typeof obj.iconName === 'string' &&
    typeof obj.description === 'string'
  );
};

const isCategory = (obj: any): obj is CategoryType => {
  return (
    obj &&
    typeof obj === 'object' &&
    (obj.type === 'expense' || obj.type === 'income' || obj.type === 'transfer') &&
    typeof obj.name === 'string' &&
    typeof obj.iconName === 'string' &&
    typeof obj.color === 'string' &&
    typeof obj.description === 'string' &&
    typeof obj.subcategories === 'object' &&
    isArrayOfStrings(obj.subcategories.order) &&
    typeof obj.subcategories.list === 'object' &&
    Object.keys(obj.subcategories.list).every((key) => isSubcategory(obj.subcategories.list[key]))
  );
};

const getValidCategory = (obj: unknown): CategoryType => {
  if (isCategory(obj)) {
    return obj;
  }
  return defaultCategory;
};

export const getValidCategoriesOrderedList = (querySnapshot: QuerySnapshot): CategoriesOrderedListType => {
  const list: CategoriesListType = {};
  let order: string[] = [];

  querySnapshot.forEach((doc) => {
    if (doc.id === 'order') {
      order = getValidOrder(doc.data());
    } else {
      list[doc.id] = getValidCategory(doc.data());
    }
  });

  return { list, order };
};

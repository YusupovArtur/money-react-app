import { store } from 'store';
import { TransactionType } from 'store/slices/transactionsSlice';
import { ValidatorReturnType } from 'shared/hooks/useFormValidation/useFormValidation.tsx';
import { CategoryType } from 'store/slices/categoriesSlice';

export const subcategoryValidator = (formData: TransactionType): ValidatorReturnType => {
  const { category: categoryID, subcategory: subcategoryID } = formData;

  const state = store.getState();
  const category = state.categories.list[categoryID] as CategoryType | undefined;
  const subcategory = category ? category.subcategories.list[subcategoryID] : undefined;

  // if (!category || !categories[category] || categories[category].subcategories.order.length === 0 || !subcategory) {
  //   return { isValid: undefined };
  // }

  if (!categoryID && subcategoryID) {
    return { isValid: false, feedback: 'categoryID == "" and subcategoryID != ""' };
  }

  if (category && subcategory) {
    return { isValid: false, feedback: 'Такой подкатегории не существует' };
  }

  return { isValid: true };
};

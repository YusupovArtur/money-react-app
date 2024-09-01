import { store } from 'store';
import { TransactionType } from 'store/slices/transactionsSlice';
import { validatorsReturnType } from 'shared/hooks/useFormValidation/useFormValidation.tsx';

export const subcategoryValidator = (formData: TransactionType): validatorsReturnType => {
  const { type, category, subcategory } = formData;

  const state = store.getState();
  const categories = state.categories.list;

  // if (!category || !categories[category] || categories[category].subcategories.order.length === 0 || !subcategory) {
  //   return { isValid: undefined };
  // }

  if (category && categories[category] && subcategory && !categories[category].subcategories.list[subcategory]) {
    return { isValid: false, feedback: 'Такой подкатегории не существует' };
  }

  return { isValid: true };
};

import { ValidatorReturnType } from 'shared/hooks/useFormValidation/useFormValidation.tsx';
import { TransactionType } from 'store/slices/transactionsSlice';
import { store } from 'store';
import { CategoryType } from 'store/slices/categoriesSlice';
import { getTypeCaption } from 'entities/EntitiesComponents';

export const categoryValidator = (formData: TransactionType): ValidatorReturnType => {
  const { type, category: id } = formData;

  if (!id) {
    if (type === 'transfer') {
      return { isValid: true };
    } else {
      return { isValid: false, feedback: `Введите категорию ${getTypeCaption(type, 'а').toLowerCase()}` };
    }
  }

  const state = store.getState();
  const category = state.categories.list[id] as CategoryType | undefined;

  if (!category) {
    return { isValid: false, feedback: 'Такой категории не существует' };
  }

  if (type !== category.type) {
    return { isValid: false, feedback: 'Тип категории не подходит к типу транзакции' };
  }

  return { isValid: true };
};

import { ValidatorReturnType } from 'shared/hooks/useFormValidation/useFormValidation.tsx';
import { TransactionType } from 'store/slices/transactionsSlice';
import { store } from 'store';
import { CategoryType } from 'store/slices/categoriesSlice';

const getTypeName = (type: TransactionType['type']) => {
  switch (type) {
    case 'expense':
      return 'расхода';
    case 'income':
      return 'дохода';
    case 'transfer':
      return 'перевода';
    default:
      return '';
  }
};

export const categoryValidator = (formData: TransactionType): ValidatorReturnType => {
  const { type, category: id } = formData;

  if (!id) {
    if (type === 'transfer') {
      return { isValid: true };
    } else {
      return { isValid: false, feedback: `Введите категорию ${getTypeName(type)}` };
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

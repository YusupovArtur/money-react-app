import { validatorsReturnType } from 'shared/hooks/useFormValidation/useFormValidation.tsx';
import { TransactionType } from 'store/slices/transactionsSlice';
import { store } from 'store';

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

export const categoryValidator = (formData: TransactionType): validatorsReturnType => {
  const { type, category } = formData;

  const state = store.getState();
  const categories = state.categories.list;

  if (!category) {
    return { isValid: false, feedback: `Введите категорию ${getTypeName(type)}` };
  } else if (!categories[category]) {
    return { isValid: false, feedback: 'Такой категории не существует' };
  } else if (type !== categories[category].type) {
    return { isValid: false, feedback: 'Тип категории не подходит к типу операции' };
  }

  return { isValid: true };
};

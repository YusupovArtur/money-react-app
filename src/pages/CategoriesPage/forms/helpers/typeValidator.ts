import { validatorsReturnType } from 'shared/hooks/useFormValidation/useFormValidation.tsx';
import { CategoryAddType } from 'store/slices/categoriesSlice';

export const typeValidator = (formData: CategoryAddType): validatorsReturnType => {
  const type = formData.type;
  if (type !== 'expense' && type !== 'income' && type !== 'transfer') {
    return { isValid: false, feedback: 'Введен некорректный тип категории' };
  }
  return { isValid: true };
};

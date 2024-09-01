import { validatorsReturnType } from 'shared/hooks/useFormValidation/useFormValidation.tsx';
import { TransactionType } from 'store/slices/transactionsSlice';

export const sumValidator = (formData: TransactionType): validatorsReturnType => {
  if (isNaN(formData.sum)) {
    return { isValid: false, feedback: 'Введите число' };
  }
  return { isValid: true };
};

import { ValidatorReturnType } from 'shared/hooks/useFormValidation/useFormValidation.tsx';
import { TransactionType } from 'store/slices/transactionsSlice';

export const timeValidator = (formData: TransactionType): ValidatorReturnType => {
  if (isNaN(formData.time)) {
    return { isValid: false, feedback: 'Введите дату' };
  }
  return { isValid: true };
};

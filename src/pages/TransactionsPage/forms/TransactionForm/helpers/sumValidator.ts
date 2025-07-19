import { ValidatorReturnType } from 'shared/hooks/useFormValidation/useFormValidation.tsx';
import { TransactionType } from 'store/slices/transactionsSlice';

export const sumValidator = (formData: TransactionType): ValidatorReturnType => {
  if (isNaN(formData.sum)) {
    return { isValid: false, feedback: 'Введите число' };
  }

  if (!formData.sum) {
    return { isValid: false, feedback: 'Сумма транзакции не должна быть 0' };
  }

  if (formData.sum < 0) {
    return { isValid: false, feedback: 'Сумма транзакции не должна быть отрицательной' };
  }

  if (Math.abs(formData.sum) > 10 ** 10) {
    return { isValid: false, feedback: 'Большое число' };
  }

  return { isValid: true };
};

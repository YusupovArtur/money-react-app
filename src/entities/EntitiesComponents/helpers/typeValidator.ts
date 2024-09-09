import { ValidatorReturnType } from 'shared/hooks/useFormValidation/useFormValidation.tsx';
import { TransactionType } from 'store/slices/transactionsSlice';

type hasType = {
  type: TransactionType['type'];
};

export const typeValidator = <T extends hasType>(formData: T): ValidatorReturnType => {
  const type = formData.type;
  if (type !== 'expense' && type !== 'income' && type !== 'transfer') {
    return { isValid: false, feedback: 'Введен некорректный тип категории' };
  }
  return { isValid: true };
};

import { WalletType } from 'store/slices/walletsSlice';
import { ValidatorReturnType } from 'shared/hooks/useFormValidation/useFormValidation.tsx';

export const typeValidator = (formData: WalletType): ValidatorReturnType => {
  const type = formData.type;
  if (type !== 'credit' && type !== 'debit' && type !== 'investment') {
    return { isValid: false, feedback: 'Введен некорректный тип счета' };
  }
  return { isValid: true };
};

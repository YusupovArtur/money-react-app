import { WalletType } from 'store/slices/walletsSlice';
import { ValidatorReturnType } from 'shared/hooks/useFormValidation/useFormValidation.tsx';

export const balanceValidator = (formData: WalletType): ValidatorReturnType => {
  if (isNaN(formData.balance)) {
    return { isValid: false, feedback: 'Введите число' };
  }
  return { isValid: true };
};

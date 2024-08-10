import { WalletType } from 'store/slices/walletsSlice';
import { validatorsReturnType } from 'shared/hooks/useFormValidation/useFormValidation.tsx';

export const balanceValidator = (formData: WalletType): validatorsReturnType => {
  if (isNaN(formData.balance)) {
    return { isValid: false, feedback: 'Введите число' };
  }
  return { isValid: true };
};

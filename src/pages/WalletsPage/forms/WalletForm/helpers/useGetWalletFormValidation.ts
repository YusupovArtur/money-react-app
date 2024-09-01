import { Dispatch, SetStateAction, useState } from 'react';
import { WalletType } from 'store/slices/walletsSlice';
import { useFormValidation } from 'shared/hooks';
import { nameValidator } from 'shared/hooks/useFormValidation/validators';
import { typeValidator } from './typeValidator.ts';
import { balanceValidator } from './balanceValidator.ts';

export const useGetWalletFormValidation = (
  formData: WalletType,
): {
  setIsValidate: Dispatch<SetStateAction<{ [K in keyof WalletType]?: boolean }>>;
  validation: ReturnType<typeof useFormValidation<WalletType>>;
  setValidateFields: () => void;
} => {
  const [isValidate, setIsValidate] = useState<{ [K in keyof WalletType]?: boolean }>({
    name: Boolean(formData.name),
    type: true,
    balance: Boolean(formData.balance),
  });

  const validation = useFormValidation<WalletType>({
    formData,
    validators: {
      name: nameValidator,
      type: typeValidator,
      balance: balanceValidator,
    },
    isValidate,
  });

  const setValidateFields = () => {
    setIsValidate({ name: true, type: true, balance: true });
  };

  return { setIsValidate, validation, setValidateFields };
};

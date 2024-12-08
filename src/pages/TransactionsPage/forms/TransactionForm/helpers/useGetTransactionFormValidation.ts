import { Dispatch, SetStateAction, useState } from 'react';
import { useFormValidation } from 'shared/hooks';
import { typeValidator } from 'entities/EntitiesComponents';
import { TransactionType } from 'store/slices/transactionsSlice';
import { sumValidator } from './sumValidator.ts';
import { timeValidator } from './timeValidator.ts';
import { walletsValidator } from 'pages/TransactionsPage/forms/TransactionForm/helpers/walletsValidator.ts';
import { useAppSelector } from 'store/store.ts';
import { categoryValidator } from 'pages/TransactionsPage/forms/TransactionForm/helpers/categoryValidator.ts';
import { subcategoryValidator } from 'pages/TransactionsPage/forms/TransactionForm/helpers/subcategoryValidator.ts';
import { selectWalletsList } from 'store/slices/walletsSlice';
import { OptionalPrimitiveKeysType } from 'shared/types';

export const useGetTransactionFormValidation = (
  formData: TransactionType,
): {
  setIsValidate: Dispatch<SetStateAction<OptionalPrimitiveKeysType<TransactionType, boolean>>>;
  validation: ReturnType<typeof useFormValidation<TransactionType>>;
  setValidateFields: () => void;
} => {
  const [isValidate, setIsValidate] = useState<OptionalPrimitiveKeysType<TransactionType, boolean>>({
    type: true,
    sum: Boolean(formData.sum),
    time: Boolean(formData.time),
    fromWallet: Boolean(formData.fromWallet) || Boolean(formData.toWallet),
    toWallet: Boolean(formData.fromWallet) || Boolean(formData.toWallet),
    category: Boolean(formData.category),
    subcategory: Boolean(formData.category) || Boolean(formData.subcategory),
  });

  const wallets = useAppSelector(selectWalletsList);
  const categories = useAppSelector((state) => state.categories.list);

  const validation = useFormValidation<TransactionType>({
    formData,
    validators: {
      type: typeValidator,
      sum: sumValidator,
      time: timeValidator,
      fromWallet: walletsValidator,
      toWallet: walletsValidator,
      category: categoryValidator,
      subcategory: subcategoryValidator,
    },
    isValidate,
    extraDeps: [wallets, categories],
  });

  const setValidateFields = () => {
    setIsValidate({
      type: true,
      sum: true,
      time: true,
      fromWallet: true,
      toWallet: true,
      category: true,
      subcategory: true,
    });
  };

  return { setIsValidate, validation, setValidateFields };
};

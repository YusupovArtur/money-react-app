import { Dispatch, FC, SetStateAction, useState } from 'react';
// Store
import { ResponseHooksType, useAppDispatch } from 'store/index.ts';
import { addTransaction, TransactionType } from 'store/slices/transactionsSlice';
// Forms
import { ModalWindowContainer } from 'shared/containers';
import { InputFormControl } from 'entities/InputFormControl';
import { TransactionForm } from '../../forms/TransactionForm/TransactionForm.tsx';
import { useGetTransactionFormValidation } from '../../forms/TransactionForm/helpers/useGetTransactionFormValidation.ts';
import { getToday } from 'shared/helpers';

interface TransactionInputProps {
  isOpened: boolean;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
  type: TransactionType['type'] | null;
}

export const TransactionInput: FC<TransactionInputProps> = ({ isOpened, setIsOpened, type }) => {
  const [formData, setFormData] = useState<TransactionType>({
    sum: 0,
    time: getToday(),
    type: type === null ? 'expense' : type,
    fromWallet: '',
    toWallet: '',
    category: '',
    subcategory: '',
    description: '',
  });

  const dispatch = useAppDispatch();
  const onAdd = (statusHooks: ResponseHooksType) => {
    dispatch(addTransaction({ operation: formData, ...statusHooks }));
  };

  const onClear = () => {
    setIsValidate({
      type: true,
      sum: Boolean(formData.sum),
      time: Boolean(formData.time),
      fromWallet: Boolean(formData.fromWallet),
      toWallet: Boolean(formData.toWallet),
      category: Boolean(formData.category),
      subcategory: Boolean(formData.subcategory),
    });
    setFormData({
      sum: 0,
      time: getToday(),
      type: type === null ? 'expense' : type,
      fromWallet: '',
      toWallet: '',
      category: '',
      subcategory: '',
      description: '',
    });
  };
  const onClose = (isOpened: boolean) => {
    setIsOpened(isOpened);
    onClear();
  };

  // Validation
  const { setIsValidate, validation, setValidateFields } = useGetTransactionFormValidation(formData);

  return (
    <ModalWindowContainer isOpened={isOpened} onCollapse={setIsOpened} onClose={onClose} style={{ margin: 'auto' }}>
      <TransactionForm
        type={type}
        formData={formData}
        setFormData={setFormData}
        validation={validation}
        setIsValidate={setIsValidate}
      />
      <InputFormControl
        caption="Транзакция"
        disabled={!validation.isValid}
        setIsOpened={setIsOpened}
        setValidate={setValidateFields}
        onClear={onClear}
        onAdd={onAdd}
      />
    </ModalWindowContainer>
  );
};

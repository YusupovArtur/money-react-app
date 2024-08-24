import { Dispatch, FC, SetStateAction, useState } from 'react';
// Store
import { ResponseHooksType, useAppDispatch } from 'store/index.ts';
import { addTransaction, TransactionType } from 'store/slices/transactionsSlice';
// Input components
import { ModalWindowContainer } from 'shared/containers';
import { InputFormControl } from 'entities/InputFormControl';
import { TransactionForm } from '../../forms/TransactionForm/TransactionForm.tsx';

interface TransactionInputProps {
  isOpened: boolean;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
  type: TransactionType['type'] | 'optional';
}

export const TransactionInput: FC<TransactionInputProps> = ({ isOpened, setIsOpened, type }) => {
  const [formData, setFormData] = useState<TransactionType>({
    sum: 0,
    time: new Date().getTime(),
    type: type === 'optional' ? 'expense' : type,
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
    setFormData({
      sum: 0,
      time: new Date().getTime(),
      type: type === 'optional' ? 'expense' : type,
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

  return (
    <ModalWindowContainer isOpened={isOpened} onCollapse={setIsOpened} onClose={onClose} style={{ margin: 'auto' }}>
      <TransactionForm type={type} formData={formData} setFormData={setFormData} />
      <InputFormControl caption="Транзакция" setIsOpened={setIsOpened} onClear={onClear} onAdd={onAdd} />
    </ModalWindowContainer>
  );
};

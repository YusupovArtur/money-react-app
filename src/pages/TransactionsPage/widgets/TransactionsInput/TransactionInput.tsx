import { Dispatch, FC, SetStateAction, useState } from 'react';
// Store
import { ResponseHooksType, useAppDispatch } from 'store/index.ts';
import { addTransaction, TransactionType } from 'store/slices/transactionsSlice';
// Input components
import { ModalContainer } from 'shared/containers';
import { InputFormControl } from 'entities/InputFormControl';
import { TransactionForm } from '../../forms/TransactionForm.tsx';
import { ModalContainerWrapper } from 'shared/ui';

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

  return (
    <ModalContainer isOpened={isOpened} onCollapse={setIsOpened} style={{ margin: 'auto' }}>
      <ModalContainerWrapper style={{ maxWidth: '35rem', width: '100vw' }}>
        <InputFormControl caption="Транзакция" setIsOpened={setIsOpened} onClear={onClear} onAdd={onAdd} />
        <TransactionForm type={type} formData={formData} setFormData={setFormData} />
      </ModalContainerWrapper>
    </ModalContainer>
  );
};

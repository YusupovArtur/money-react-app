import { Dispatch, FC, SetStateAction, useState } from 'react';
// Store
import { ResponseHooksType, useAppDispatch } from 'store/index.ts';
import { addTransaction, TransactionType } from 'store/slices/transactionsSlice';
// Input components
import { ModalContainer } from 'shared/containers';
import { InputFormControl } from 'entities/InputFormBar';
import TransactionForm from '../../forms/TransactionForm.tsx';
import { dateStateType } from 'components_legacy/small_components/date_input/types.ts';
import { getDateStateFromTimestamp } from 'components_legacy/small_components/date_input/functions.ts';
import { ModalContainerWrapper } from 'shared/wrappers';

const TransactionInput: FC<{
  isOpened: boolean;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
  type: TransactionType['type'] | 'optional';
}> = ({ isOpened, setIsOpened, type }) => {
  const dispatch = useAppDispatch();

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
  const [dateState, setDateState] = useState<dateStateType>(getDateStateFromTimestamp(new Date().getTime()));

  const clearFunction = () => {
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
    setDateState(getDateStateFromTimestamp(new Date().getTime()));
  };

  const addFunction = (statusHooks: ResponseHooksType) => {
    dispatch(addTransaction({ operation: formData, ...statusHooks }));
  };

  return (
    <ModalContainer isOpened={isOpened} onCollapse={setIsOpened} style={{ margin: 'auto' }}>
      <ModalContainerWrapper style={{ maxWidth: '35rem', width: '100vw' }}>
        <InputFormControl caption="Транзакция" setIsOpened={setIsOpened} onClear={clearFunction} onAdd={addFunction} />
        <TransactionForm
          formData={formData}
          setFormData={setFormData}
          type={type}
          dateState={dateState}
          setDateState={setDateState}
        />
      </ModalContainerWrapper>
    </ModalContainer>
  );
};

export default TransactionInput;

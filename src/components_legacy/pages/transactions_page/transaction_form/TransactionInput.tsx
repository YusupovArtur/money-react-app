import { Dispatch, FC, SetStateAction, useState } from 'react';
// Store
import { useAppDispatch } from 'store/hook';
import { addOperation } from 'store/slices/operationsSlice';
import { operationType, serverResponseStatusHooks } from 'store/types';
// Input components
import { ModalContainer } from 'shared/containers';
import InputFormBar from 'entities/InputFormBar';
import TransactionForm from '../../../pages/transactions_page/transaction_form/TransactionForm';
import { dateStateType } from '../../../small_components/date_input/types';
import { getDateStateFromTimestamp } from '../../../small_components/date_input/functions';
import { ModalContainerWrapper } from 'shared/wrappers';

const TransactionInput: FC<{
  isShowInput: boolean;
  setIsShowInput: Dispatch<SetStateAction<boolean>>;
  type: 'expense' | 'income' | 'transfer' | 'optional';
}> = ({ isShowInput, setIsShowInput, type }) => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<operationType>({
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

  const addFunction = (statusHooks: serverResponseStatusHooks) => {
    dispatch(addOperation({ operation: formData, ...statusHooks }));
  };

  return (
    <ModalContainer isOpened={isShowInput} onCollapse={() => setIsShowInput(false)} style={{ margin: 'auto' }}>
      <ModalContainerWrapper style={{ maxWidth: '35rem', width: '100vw' }}>
        <InputFormBar addButtonsLabel="Транзакция" setIsOpened={setIsShowInput} onClear={clearFunction} onAdd={addFunction} />
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

import React, { useState } from 'react';
// Store
import { useAppDispatch } from 'store/hook';
import { addOperation } from 'store/slices/operationsSlice';
import { operationType, serverResponseStatusHooks } from 'store/types';
// Input components
import TransactionForm from 'components/pages/transactions_page/transaction_form/TransactionForm';
import ModalContainer from 'components/small_components/ModalContainer';
import InputBar from 'components/small_components/control_panels/InputBar';
import { dateStateType } from 'components/small_components/date_input/types';
import { getDateStateFromTimestamp } from 'components/small_components/date_input/functions';
import { walletType } from 'store/types';

const TransactionInput: React.FC<{
  isShowInput: boolean;
  setIsShowInput: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [stringNumber, setStringNumber] = useState<string>('0');
  const [dateState, setDateState] = useState<dateStateType>(getDateStateFromTimestamp(new Date().getTime()));
  const [fromWallet, setFromWallet] = useState<walletType | undefined>(undefined);
  const [toWallet, setToWallet] = useState<walletType | undefined>(undefined);

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
    setStringNumber('0');
    setDateState(getDateStateFromTimestamp(new Date().getTime()));
    setFromWallet(undefined);
    setToWallet(undefined);
  };

  const addFunction = (statusHooks: serverResponseStatusHooks) => {
    dispatch(addOperation({ operation: formData, ...statusHooks }));
  };

  return (
    <ModalContainer
      isOpened={isShowInput}
      setIsOpened={setIsShowInput}
      style={{ maxWidth: '35rem', width: '100vw' }}
      className="d-flex flex-column align-items-start bg-body-tertiary shadow-sm p-3 rounded-4"
    >
      <InputBar
        addButtonLabel="Транзакция"
        setIsOpened={setIsShowInput}
        clearFunction={clearFunction}
        addFunction={addFunction}
      ></InputBar>
      <TransactionForm
        formData={formData}
        setFormData={setFormData}
        type={type}
        stringNumber={stringNumber}
        setStringNumber={setStringNumber}
        dateState={dateState}
        setDateState={setDateState}
        fromWallet={fromWallet}
        setFromWallet={setFromWallet}
        toWallet={toWallet}
        setToWallet={setToWallet}
      ></TransactionForm>
    </ModalContainer>
  );
};

export default TransactionInput;

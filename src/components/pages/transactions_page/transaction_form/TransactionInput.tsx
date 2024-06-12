import React, { useState, useEffect } from 'react';
// Store
import { useAppDispatch } from 'store/hook';
import { addOperation } from 'store/slices/operationsSlice';
import { operationType } from 'store/types';
// Input components
import TransactionTypeToggle from 'components/pages/transactions_page/transaction_form/TransactionTypeToggle';
import TransactionForm from 'components/pages/transactions_page/transaction_form/TransactionForm';
import ModalContainer from 'components/small_components/ModalContainer';
import InputBar from 'components/small_components/control_panels/InputBar';

const TransactionInput: React.FC<{
  isShowInput: boolean;
  setIsShowInput: React.Dispatch<React.SetStateAction<boolean>>;
  type: 'expense' | 'income' | 'transfer' | 'optional';
}> = ({ isShowInput, setIsShowInput, type }) => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<operationType>({
    sum: 0,
    time: 0,
    type: type === 'optional' ? 'expense' : type,
    fromWallet: '',
    toWallet: '',
    category: '',
    subcategory: '',
    description: '',
  });

  const clearFunction = () =>
    setFormData({
      sum: 0,
      time: 0,
      type: type === 'optional' ? 'expense' : type,
      fromWallet: '',
      toWallet: '',
      category: '',
      subcategory: '',
      description: '',
    });

  const addFunction = (
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
    isOk: React.MutableRefObject<boolean>,
  ) => {
    dispatch(addOperation({ setIsLoading, setErrorMessage, isOk, operation: formData }));
  };

  useEffect(() => {
    setFormData((state) => ({
      ...state,
      sum: 0,
      time: 0,
      fromWallet: '',
      toWallet: '',
      category: '',
      subcategory: '',
      description: '',
    }));
  }, [formData.type]);

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
      <TransactionTypeToggle
        type={formData.type}
        setType={(type: 'expense' | 'income' | 'transfer') => setFormData((state) => ({ ...state, type: type }))}
      ></TransactionTypeToggle>
      <TransactionForm formData={formData} setFormData={setFormData} type={formData.type}></TransactionForm>
    </ModalContainer>
  );
};

export default TransactionInput;

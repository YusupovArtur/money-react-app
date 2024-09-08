import { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
// Store
import { useAppDispatch, useAppSelector } from 'store/store.ts';
import { deleteTransaction, selectTransaction, TransactionType, updateTransaction } from 'store/slices/transactionsSlice';
import { ResponseHooksType } from 'store/types/ResponseHooksType.ts';
// Helpers
import { getTodayTimestamp } from 'shared/helpers';
import { useTimeoutRefWithClear } from 'shared/hooks';
// Forms
import { TransactionForm } from 'pages/TransactionsPage/forms/TransactionForm/TransactionForm.tsx';
import { EditFromControl } from 'entities/EditFormControl';
import { useGetTransactionFormValidation } from 'pages/TransactionsPage/forms/TransactionForm/helpers/useGetTransactionFormValidation.ts';
// UI
import { MODAL_CONTAINER_ANIMATION_DURATION } from 'shared/containers/ModalContainer/ModalContainer.tsx';
import { ModalWindowContainer } from 'shared/containers';
import { TransactionEditInfo } from 'pages/TransactionsPage/widgets/TransactionEdit/ui/TransactionEditInfo.tsx';

export const TransactionEdit: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get('transactionID');

  const transaction = useAppSelector(selectTransaction(id));
  const isLoading = useAppSelector((state) => state.transactions.responseState.isLoading);
  const defaultValue: TransactionType = {
    type: transaction?.type || 'expense',
    sum: transaction?.sum || 0,
    time: transaction?.time || getTodayTimestamp(),
    fromWallet: transaction?.fromWallet || '',
    toWallet: transaction?.toWallet || '',
    category: transaction?.category || '',
    subcategory: transaction?.subcategory || '',
    description: transaction?.description || '',
  };

  useEffect(() => {
    if (isLoading === false && id !== null && !transaction) {
      alert(`Транзакции с ID "${id}" не существует`);
      searchParams.delete('transactionID');
      setSearchParams(searchParams);
    }
    onClear();
  }, [isLoading, id, transaction]);

  // Form data
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [formData, setFormData] = useState<TransactionType>(defaultValue);
  const [isOpened, setIsOpened] = useState<boolean>(true);
  const timeoutRef = useTimeoutRefWithClear();

  // Callbacks
  const handleClose = () => {
    setIsOpened(false);
    timeoutRef.current = setTimeout(() => {
      searchParams.delete('transactionID');
      setSearchParams(searchParams);
    }, MODAL_CONTAINER_ANIMATION_DURATION);
  };

  const onClear = () => {
    setFormData(defaultValue);
  };

  const dispatch = useAppDispatch();
  const onUpdate = (statusHooks: ResponseHooksType) => {
    if (id !== null) {
      dispatch(updateTransaction({ id, operationProps: formData, ...statusHooks }));
    }
  };
  const onUpdateFulfilled = () => {
    setIsEdit(false);
  };

  const onDelete = (statusHooks: ResponseHooksType) => {
    if (id !== null) {
      dispatch(deleteTransaction({ id, ...statusHooks }));
    }
  };
  const onDeleteFulfilled = () => {
    searchParams.delete('transactionID');
    setSearchParams(searchParams);
  };

  // Form validation
  const { setIsValidate, validation, setValidateFields } = useGetTransactionFormValidation(formData);
  console.log(validation);

  // Return null if not find transaction
  if (!transaction) {
    return null;
  }

  return (
    <ModalWindowContainer
      isOpened={isOpened}
      onClose={handleClose}
      onCollapse={isEdit ? undefined : handleClose}
      style={{ margin: 'auto' }}
    >
      {isEdit ? (
        <TransactionForm
          type={formData.type}
          formData={formData}
          setFormData={setFormData}
          validation={validation}
          setIsValidate={setIsValidate}
        />
      ) : (
        <TransactionEditInfo transaction={transaction} />
      )}

      <EditFromControl
        disabled={!validation.isValid}
        setValidate={setValidateFields}
        onClear={onClear}
        onUpdate={onUpdate}
        onDelete={onDelete}
        onUpdateFulfilled={onUpdateFulfilled}
        onDeleteFulfilled={onDeleteFulfilled}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        captions={{ itemType: 'Транзакцию', itemName: id || '' }}
      />
    </ModalWindowContainer>
  );
};

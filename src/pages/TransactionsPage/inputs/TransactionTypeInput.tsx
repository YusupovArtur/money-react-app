import { Dispatch, FC, SetStateAction } from 'react';
import { TransactionType } from 'store/slices/transactionsSlice';
import { getTransactionEntityTypeName } from 'entities/EntitiesComponents';
import { RadioButtonGroup, RadioOptions } from 'shared/inputs';
import { CategoryType } from 'store/slices/categoriesSlice';

interface TransactionTypeToggleProps {
  id?: string;
  type: TransactionType['type'];
  setFormData: Dispatch<SetStateAction<TransactionType>>;
}

export const TransactionTypeInput: FC<TransactionTypeToggleProps> = ({ id, type, setFormData }) => {
  const options: RadioOptions<CategoryType['type']> = [
    { value: 'expense', label: getTransactionEntityTypeName('expense'), className: 'btn-outline-danger' },
    { value: 'income', label: getTransactionEntityTypeName('income'), className: 'btn-outline-success' },
    { value: 'transfer', label: getTransactionEntityTypeName('transfer'), className: 'btn-outline-primary' },
  ];

  const handleSetType = (type: TransactionType['type']) => {
    setFormData((state) => {
      if (state.type === 'expense' && type === 'income') {
        return {
          ...state,
          type: type,
          fromWallet: '',
          toWallet: state.fromWallet,
          category: '',
          subcategory: '',
          description: '',
        };
      }

      if (state.type === 'expense' && type === 'transfer') {
        return {
          ...state,
          type: type,
          category: '',
          subcategory: '',
          description: '',
        };
      }

      if (state.type === 'income' && type === 'expense') {
        return {
          ...state,
          type: type,
          fromWallet: state.toWallet,
          toWallet: '',
          category: '',
          subcategory: '',
          description: '',
        };
      }

      if (state.type === 'income' && type === 'transfer') {
        return {
          ...state,
          type: type,
          category: '',
          subcategory: '',
          description: '',
        };
      }

      if (state.type === 'transfer' && type === 'expense') {
        return {
          ...state,
          type: type,
          fromWallet: state.fromWallet || state.toWallet,
          toWallet: '',
          category: '',
          subcategory: '',
          description: '',
        };
      }

      if (state.type === 'transfer' && type === 'income') {
        return {
          ...state,
          type: type,
          toWallet: state.toWallet || state.fromWallet,
          fromWallet: '',
          category: '',
          subcategory: '',
          description: '',
        };
      }

      return state;
    });
  };

  return (
    <>
      <input id={id} type="text" value={type || ''} readOnly={true} style={{ display: 'none' }} />

      <RadioButtonGroup option={type} setOption={handleSetType} options={options} />
    </>
  );
};

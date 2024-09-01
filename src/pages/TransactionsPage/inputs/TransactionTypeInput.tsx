import { FC } from 'react';
import { TransactionType } from 'store/slices/transactionsSlice';
import { getTransactionEntityTypeName } from 'entities/EntitiesComponents';
import { RadioButtonGroup, RadioOptions } from 'shared/inputs';
import { CategoryType } from 'store/slices/categoriesSlice';

interface TransactionTypeToggleProps {
  id?: string;
  type: TransactionType['type'];
  setType: (type: TransactionType['type']) => any;
  onClear: (type: TransactionType['type']) => any;
}

export const TransactionTypeInput: FC<TransactionTypeToggleProps> = ({ id, type, setType, onClear }) => {
  const options: RadioOptions<CategoryType['type']> = [
    { value: 'expense', label: getTransactionEntityTypeName('expense'), className: 'btn-outline-danger' },
    { value: 'income', label: getTransactionEntityTypeName('income'), className: 'btn-outline-success' },
    { value: 'transfer', label: getTransactionEntityTypeName('transfer'), className: 'btn-outline-primary' },
  ];

  const handleSetType = (type: TransactionType['type']) => {
    setType(type);
    onClear(type);
  };

  return (
    <>
      <input id={id} type="text" value={type || ''} readOnly={true} style={{ display: 'none' }} />

      <RadioButtonGroup option={type} setOption={handleSetType} options={options} />
    </>
  );
};

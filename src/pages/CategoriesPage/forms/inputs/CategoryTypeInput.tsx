import { FC } from 'react';
import { CategoryType } from 'store/slices/categoriesSlice';
import { RadioButtonGroup, RadioOptions } from 'shared/inputs';
import { getTransactionEntityTypeName } from 'entities/EntitiesComponents';

interface CategoryTypeInputProps {
  type: CategoryType['type'];
  setType: (type: CategoryType['type']) => any;
  id?: string;
}

export const CategoryTypeInput: FC<CategoryTypeInputProps> = ({ type, setType, id }) => {
  const options: RadioOptions<CategoryType['type']> = [
    { value: 'expense', label: getTransactionEntityTypeName('expense'), className: 'btn-outline-danger' },
    { value: 'income', label: getTransactionEntityTypeName('income'), className: 'btn-outline-success' },
    { value: 'transfer', label: getTransactionEntityTypeName('transfer'), className: 'btn-outline-primary' },
  ];

  return (
    <>
      <input id={id} type="text" value={type || ''} readOnly={true} style={{ display: 'none' }} />

      <RadioButtonGroup option={type} setOption={setType} options={options} />
    </>
  );
};

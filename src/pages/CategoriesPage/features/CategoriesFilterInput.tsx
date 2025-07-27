import { Dispatch, FC, SetStateAction } from 'react';
import { CategoryType } from 'store/slices/categoriesSlice';
import { RadioButtonGroup, RadioOptions } from 'shared/inputs';
import { getTypeCaption } from 'entities/EntitiesComponents';

export const CategoriesFilterInput: FC<{
  filter: CategoryType['type'] | null;
  setFilter: Dispatch<SetStateAction<CategoryType['type'] | null>>;
}> = ({ filter, setFilter }) => {
  const options: RadioOptions<CategoryType['type'] | null> = [
    { value: null, label: 'Все', className: 'btn-outline-primary' },
    { value: 'expense', label: getTypeCaption('expense', 'ы'), className: 'btn-outline-danger' },
    { value: 'income', label: getTypeCaption('income', 'ы'), className: 'btn-outline-success' },
    { value: 'transfer', label: getTypeCaption('transfer', 'ы'), className: 'btn-outline-primary' },
  ];

  return <RadioButtonGroup option={filter} setOption={setFilter} options={options} />;
};

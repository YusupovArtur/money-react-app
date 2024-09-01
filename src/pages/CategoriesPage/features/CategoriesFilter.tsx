import { Dispatch, FC, SetStateAction } from 'react';
import { CategoryType } from 'store/slices/categoriesSlice';
import { RadioButtonGroup, RadioOptions } from 'shared/inputs';

export const CategoriesFilter: FC<{
  filter: CategoryType['type'] | null;
  setFilter: Dispatch<SetStateAction<CategoryType['type'] | null>>;
}> = ({ filter, setFilter }) => {
  const options: RadioOptions<CategoryType['type'] | null> = [
    { value: null, label: 'Все', className: 'btn-outline-primary' },
    { value: 'expense', label: 'Расходы', className: 'btn-outline-danger' },
    { value: 'income', label: 'Доходы', className: 'btn-outline-success' },
    { value: 'transfer', label: 'Переводы', className: 'btn-outline-primary' },
  ];

  return <RadioButtonGroup option={filter} setOption={setFilter} options={options} />;
};

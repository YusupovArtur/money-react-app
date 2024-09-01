import { FC, useDeferredValue } from 'react';
import { CategoryType } from 'store/slices/categoriesSlice';
import { useAppSelector } from 'store/store.ts';
import { IDInput, IDOptionType } from './components/IDInput.tsx';

interface CategoryIdInputProps {
  inputID?: string;
  categoryID: string;
  setCategoryID: (id: string) => any;
  categoryType: CategoryType['type'];
  setValidate: () => any;
}

export const CategoryIDInput: FC<CategoryIdInputProps> = ({ inputID, categoryID, setCategoryID, categoryType, setValidate }) => {
  const categories = useAppSelector((state) => state.categories.list);
  const categoriesOrder = useAppSelector((state) => state.categories.order);

  const category = categoryID ? categories[categoryID] : undefined;
  const categoryTypeDeferred = useDeferredValue(categoryType);

  const option: IDOptionType = {
    id: categoryID,
    name: category ? category.name : categoryID ? 'Неизвестная категория' : 'Категория не выбрана',
    iconName: category ? category.iconName : categoryID ? 'Exclamation' : 'Question',
    color: category ? category.color : '',
  };

  const options: IDOptionType[] = [
    { id: '', name: 'Не выбрана', iconName: 'Question', color: '' },
    ...categoriesOrder
      .filter((id) => categories[id].type === categoryTypeDeferred)
      .map((id) => {
        return {
          id,
          name: categories[id].name,
          color: categories[id].color,
          iconName: categories[id].iconName,
        };
      }),
  ];

  return (
    <IDInput
      inputID={inputID}
      option={option}
      options={options}
      setID={setCategoryID}
      setValidate={setValidate}
      topBorderColor={categoryType === 'income' ? 'success' : categoryType === 'expense' ? 'danger' : 'primary'}
    ></IDInput>
  );
};

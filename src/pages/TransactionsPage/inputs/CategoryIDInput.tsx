import { FC, useDeferredValue } from 'react';
import {
  CategoryType,
  selectCategoriesList,
  selectFilteredCategoriesOrder,
  useGetDisplayedCategory,
} from 'store/slices/categoriesSlice';
import { useAppSelector } from 'store/store.ts';
import { IDInput, IDOptionType } from './components/IDInput.tsx';
import { selectBodyBackgroundColor } from 'store/slices/themeSlice';

interface CategoryIdInputProps {
  inputID?: string;
  categoryID: string;
  setCategoryID: (id: string) => any;
  categoryType: CategoryType['type'];
  setValidate: () => any;
}

export const CategoryIDInput: FC<CategoryIdInputProps> = ({ inputID, categoryID, setCategoryID, categoryType, setValidate }) => {
  const { displayedCategory: category } = useGetDisplayedCategory({ id: categoryID, type: categoryType });
  const categories = useAppSelector(selectCategoriesList);

  const categoryTypeFilterDeferred = useDeferredValue(categoryType);
  const categoriesOrder = useAppSelector(selectFilteredCategoriesOrder(categoryTypeFilterDeferred));

  const bodyColor = useAppSelector(selectBodyBackgroundColor);

  const option: IDOptionType = {
    id: categoryID,
    name: category.name,
    iconName: category.iconName,
    color: category.color,
  };

  const options: IDOptionType[] = [
    {
      id: '',
      name: 'Не выбрана',
      iconName: categoryType === 'transfer' ? 'QuestionSmall' : 'Question',
      color: categoryType === 'transfer' ? bodyColor : '',
    },
    ...categoriesOrder.map((id) => {
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
      emptySelectMessage={{
        isShow: categoryType === 'transfer' && categoriesOrder.length === 0,
        caption: 'Нет категорий',
      }}
    ></IDInput>
  );
};

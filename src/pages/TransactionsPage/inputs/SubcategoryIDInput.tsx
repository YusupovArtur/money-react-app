import { FC } from 'react';
import { useAppSelector } from 'store/store.ts';
import {
  selectCategory,
  selectSubcategoriesList,
  selectSubcategoriesOrder,
  useGetDisplayedSubcategory,
} from 'store/slices/categoriesSlice';
import { selectBodyBackgroundColor } from 'store/slices/themeSlice';
import { IDInput, IDOptionType } from 'pages/TransactionsPage/inputs/components/IDInput.tsx';

interface SubcategoryIDInputProps {
  inputID?: string;
  categoryID: string;
  subcategoryID: string;
  setSubcategoryID: (id: string) => any;
  setValidate?: () => any;
}

export const SubcategoryIDInput: FC<SubcategoryIDInputProps> = ({
  inputID,
  categoryID,
  subcategoryID,
  setSubcategoryID,
  setValidate,
}) => {
  // const subcategory = useAppSelector(selectSubcategory({ categoryID, subcategoryID }));
  const {
    displayedSubcategory: subcategory,
    categoryColor,
    subcategoryColor,
  } = useGetDisplayedSubcategory({ categoryID, subcategoryID });
  const category = useAppSelector(selectCategory(categoryID));
  const subcategoriesList = useAppSelector(selectSubcategoriesList(categoryID));
  const subcategoriesOrder = useAppSelector(selectSubcategoriesOrder(categoryID));

  const selectedIconSize = '2.3rem';
  const bodyColor = useAppSelector(selectBodyBackgroundColor);
  const topBorderColor = category
    ? category.type === 'expense'
      ? 'danger'
      : category.type === 'income'
        ? 'success'
        : 'primary'
    : undefined;

  const option: IDOptionType = {
    id: subcategoryID,
    name: subcategory.name,
    iconName: subcategory.iconName,
    color: subcategoryColor,
  };

  const options: IDOptionType[] =
    subcategoriesOrder && subcategoriesList
      ? [
          { id: '', name: 'Не выбрана', iconName: 'QuestionSmall', color: bodyColor },
          ...subcategoriesOrder.map((id) => {
            return {
              id,
              name: subcategoriesList[id].name,
              color: categoryColor,
              iconName: subcategoriesList[id].iconName,
            };
          }),
        ]
      : [];

  return (
    <IDInput
      inputID={inputID}
      option={option}
      options={options}
      setID={setSubcategoryID}
      topBorderColor={topBorderColor}
      setValidate={setValidate}
      selectedIconSize={selectedIconSize}
      emptySelectMessage={{
        isShow: !category || !subcategoriesList || !subcategoriesOrder || subcategoriesOrder?.length === 0,
        caption: 'Нет подкатегорий',
      }}
    />
  );
};

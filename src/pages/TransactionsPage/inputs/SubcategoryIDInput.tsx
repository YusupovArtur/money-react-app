import { FC } from 'react';
import { useAppSelector } from 'store/store.ts';
import { CategoryType } from 'store/slices/categoriesSlice';
import { COLOR_NAMES_HEX } from 'shared/inputs/ColorHexInput/constants/COLOR_NAMES_HEX.ts';
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
  const category = useAppSelector((state) => state.categories.list[categoryID]) as CategoryType | undefined;

  const subcategories = category ? category.subcategories.list : undefined;
  const subcategoriesOrder = category ? category.subcategories.order : undefined;

  const subcategory = subcategories && subcategoryID ? subcategories[subcategoryID] : undefined;

  const selectedIconSize = '2rem';

  const theme = useAppSelector((state) => state.theme.themeDisplay);
  const bodyColor = theme === 'light' ? COLOR_NAMES_HEX['gray-100'] : COLOR_NAMES_HEX['body-tertiary-dark'];

  if (!category || !subcategories || !subcategoriesOrder || subcategoriesOrder?.length === 0) {
    return (
      <>
        <input id={inputID} type="text" value={categoryID || ''} readOnly={true} style={{ display: 'none' }} />
        <div style={{ height: `calc(${selectedIconSize} + 0.75rem)` }} className="d-flex align-items-center px-2">
          <span className="text-body-tertiary">Нет подкатегорий</span>
        </div>
      </>
    );
  }

  const option: IDOptionType = {
    id: subcategoryID,
    name: subcategory ? subcategory.name : subcategoryID ? 'Неизвестный счет' : 'Счет не выбран',
    iconName: subcategory ? subcategory.iconName : subcategoryID ? 'Exclamation' : 'Question',
    color: subcategory ? category.color : subcategoryID ? '' : bodyColor,
  };

  const options: IDOptionType[] = [
    { id: '', name: 'Не выбрана', iconName: 'Question', color: bodyColor },
    ...subcategoriesOrder.map((id) => {
      return {
        id,
        name: subcategories[id].name,
        color: category.color,
        iconName: subcategories[id].iconName,
      };
    }),
  ];

  return (
    <IDInput
      inputID={inputID}
      option={option}
      options={options}
      setID={setSubcategoryID}
      topBorderColor={category.type === 'expense' ? 'danger' : category.type === 'income' ? 'success' : 'primary'}
      setValidate={setValidate}
      selectedIconSize={selectedIconSize}
    />
  );
};

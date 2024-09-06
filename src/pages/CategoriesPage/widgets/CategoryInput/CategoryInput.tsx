import { Dispatch, FC, SetStateAction, useState } from 'react';
// Form
import { ModalWindowContainer } from 'shared/containers';
import { InputFormControl } from 'entities/InputFormControl';
import { CategoryForm } from 'pages/CategoriesPage/forms/CategoryForm.tsx';
import { useGetCategoryFormValidation } from 'pages/CategoriesPage/forms/helpers/useGetCatetegoryFormValidation.ts';
// Store
import { ResponseHooksType, useAppDispatch } from 'store/index.ts';
import { addCategory, CategoryAddType } from 'store/slices/categoriesSlice';
import { COLOR_NAMES_HEX } from 'shared/inputs/ColorHexInput/constants/COLOR_NAMES_HEX.ts';

interface CategoryInputProps {
  isOpened: boolean;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
}

export const CategoryInput: FC<CategoryInputProps> = ({ isOpened, setIsOpened }) => {
  const defaultData: CategoryAddType = {
    name: '',
    iconName: 'Card',
    color: COLOR_NAMES_HEX['gray-400'],
    type: 'expense',
    description: '',
  };

  const [formData, setFormData] = useState<CategoryAddType>(defaultData);

  // Callbacks
  const dispatch = useAppDispatch();
  const addFunction = (statusHooks: ResponseHooksType) => {
    dispatch(addCategory({ ...statusHooks, category: formData }));
  };

  const onClear = () => {
    setFormData(defaultData);
    setIsValidate({ name: true, type: true });
  };
  const onClose = (isOpened: boolean) => {
    setIsOpened(isOpened);
    onClear();
  };

  // Validation
  const { setIsValidate, validation, setValidateFields } = useGetCategoryFormValidation(formData);

  return (
    <ModalWindowContainer isOpened={isOpened} onCollapse={setIsOpened} onClose={onClose} style={{ margin: 'auto' }}>
      <CategoryForm formData={formData} setFormData={setFormData} validation={validation} setIsValidate={setIsValidate} />
      <InputFormControl
        caption="Добавить категорию"
        setIsOpened={setIsOpened}
        disabled={!validation.isValid}
        setValidate={setValidateFields}
        onAdd={addFunction}
        onClear={onClear}
      ></InputFormControl>
    </ModalWindowContainer>
  );
};

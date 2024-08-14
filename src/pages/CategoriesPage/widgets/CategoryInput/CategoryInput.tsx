import { Dispatch, FC, SetStateAction, useState } from 'react';
// Form
import { ModalWindowContainer } from 'shared/containers';
import { InputFormControl } from 'entities/InputFormControl';
import { CategoryForm } from 'pages/CategoriesPage/forms/CategoryForm.tsx';
import { useFormValidation } from 'shared/hooks';
import { nameValidator } from 'shared/hooks/useFormValidation/validators';
import { typeValidator } from 'pages/CategoriesPage/forms/helpers/typeValidator.ts';
// Store
import { ResponseHooksType, useAppDispatch } from 'store/index.ts';
import { addCategory, CategoryAddType } from 'store/slices/categoriesSlice';

interface CategoryInputProps {
  isOpened: boolean;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
}

export const CategoryInput: FC<CategoryInputProps> = ({ isOpened, setIsOpened }) => {
  const [formData, setFormData] = useState<CategoryAddType>({
    name: '',
    iconName: 'Card',
    color: '#ced4da',
    type: 'expense',
    description: '',
  });

  // Callbacks
  const dispatch = useAppDispatch();
  const addFunction = (statusHooks: ResponseHooksType) => {
    dispatch(addCategory({ ...statusHooks, category: formData }));
  };

  const onClear = () => {
    setFormData({ name: '', iconName: 'Card', color: '#ced4da', type: 'expense', description: '' });
    setIsValidate({ name: true, type: true });
  };
  const onClose = (isOpened: boolean) => {
    setIsOpened(isOpened);
    onClear();
  };

  // Validation
  const [isValidate, setIsValidate] = useState<{ [K in keyof CategoryAddType]?: boolean }>({
    name: Boolean(formData.name),
    type: Boolean(formData.type),
  });
  const validation = useFormValidation<CategoryAddType>(
    formData,
    {
      name: nameValidator,
      type: typeValidator,
    },
    isValidate,
  );
  const setValidateFields = () => {
    setIsValidate({ name: true, type: true });
  };

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

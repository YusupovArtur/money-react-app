import { Dispatch, FC, SetStateAction, useState } from 'react';
// Input components
import { ModalWindowContainer } from 'shared/containers';
import { InputFormControl } from 'entities/InputFormControl';
import { SubcategoryForm } from 'pages/CategoriesPage/forms/SubcategoryForm.tsx';
// Store
import { useAppDispatch } from 'store/index.ts';
import { addSubCategory, SubcategoryType } from 'store/slices/categoriesSlice';
import { ResponseHooksType } from 'store/types/ResponseHooksType.ts';
import { useFormValidation } from 'shared/hooks';
import { nameValidator } from 'shared/hooks/useFormValidation/validators';

interface SubcategoryInputProps {
  categoryID: string;
  isOpened: boolean;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
}

export const SubcategoryInput: FC<SubcategoryInputProps> = ({ categoryID, isOpened, setIsOpened }) => {
  const [formData, setFormData] = useState<SubcategoryType>({
    name: '',
    iconName: 'Card',
    description: '',
  });

  const onClear = () => {
    setFormData({ name: '', iconName: 'Card', description: '' });
    setIsValidate({ name: false });
  };
  const onClose = (isOpened: boolean) => {
    setIsOpened(isOpened);
    onClear();
  };

  const dispatch = useAppDispatch();
  const addFunction = (statusHooks: ResponseHooksType) => {
    dispatch(addSubCategory({ categoryID, subcategory: formData, ...statusHooks }));
  };

  // Validation
  const [isValidate, setIsValidate] = useState<{ [K in keyof SubcategoryType]?: boolean }>({
    name: Boolean(formData.name),
  });
  const validation = useFormValidation<SubcategoryType>(
    formData,
    {
      name: nameValidator,
    },
    isValidate,
  );
  const setValidateFields = () => {
    setIsValidate({ name: true });
  };

  return (
    <ModalWindowContainer isOpened={isOpened} onCollapse={setIsOpened} onClose={onClose} style={{ margin: 'auto' }}>
      <SubcategoryForm formData={formData} setFormData={setFormData} validation={validation} setIsValidate={setIsValidate} />

      <InputFormControl
        disabled={!validation.isValid}
        setValidate={setValidateFields}
        caption="Подкатегория"
        setIsOpened={setIsOpened}
        onClear={onClear}
        onAdd={addFunction}
      ></InputFormControl>
    </ModalWindowContainer>
  );
};

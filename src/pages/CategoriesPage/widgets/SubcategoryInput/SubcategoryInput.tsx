import { Dispatch, FC, SetStateAction, useState } from 'react';
// Input components
import { ModalWindowContainer } from 'shared/containers';
import { InputFormControl } from 'entities/InputFormControl';
import { SubcategoryForm } from 'pages/CategoriesPage/forms/SubcategoryForm.tsx';
// Store
import { useAppDispatch } from 'store/index.ts';
import { addSubCategory, SubcategoryType } from 'store/slices/categoriesSlice';
import { ResponseHooksType } from 'store/types/ResponseHooksType.ts';
import { useGetSubcategoryFormValidation } from 'pages/CategoriesPage/forms/helpers/useGetSubcatetegoryFormValidation.ts';

interface SubcategoryInputProps {
  categoryID: string;
  isOpened: boolean;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
}

export const SubcategoryInput: FC<SubcategoryInputProps> = ({ categoryID, isOpened, setIsOpened }) => {
  const defaultData: SubcategoryType = {
    name: '',
    iconName: 'Card',
    description: '',
  };

  const [formData, setFormData] = useState<SubcategoryType>(defaultData);

  const onClear = () => {
    setFormData(defaultData);
    setIsValidate({ name: false });
  };
  const onClose = (value: boolean | ((prev: boolean) => boolean)) => {
    setIsOpened(value);
    onClear();
  };

  const dispatch = useAppDispatch();
  const addFunction = (statusHooks: ResponseHooksType) => {
    dispatch(addSubCategory({ categoryID, subcategory: formData, ...statusHooks }));
  };

  // Validation
  const { setIsValidate, validation, setValidateFields } = useGetSubcategoryFormValidation(formData);

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

import { Dispatch, FC, SetStateAction } from 'react';
// Input components
import { ModalContainer } from 'shared/containers';
import { InputFormControl } from 'entities/InputFormBar';
import { SubcategoryForm } from '../../../pages/categories_page/subcategory_form/SubcategoryForm';
// Store
import { useAppDispatch } from 'store';
import { addSubCategory, SubcategoryType } from 'store/slices/categoriesSlice';
import { ResponseHooksType } from 'store/types/ResponseHooksType.ts';

interface SubcategoryInputProps {
  categoryID: string;
  isShowInput: boolean;
  setIsShowInput: Dispatch<SetStateAction<boolean>>;
  formData: SubcategoryType;
  setFormData: Dispatch<SetStateAction<SubcategoryType>>;
}

export const SubcategoryInput: FC<SubcategoryInputProps> = ({
  categoryID,
  isShowInput,
  setIsShowInput,
  formData,
  setFormData,
}) => {
  const dispatch = useAppDispatch();

  const addFunction = (statusHooks: ResponseHooksType) => {
    dispatch(
      addSubCategory({
        categoryID,
        subcategory: formData,
        ...statusHooks,
      }),
    );
  };

  return (
    <ModalContainer isOpened={isShowInput} onCollapse={setIsShowInput} style={{ margin: 'auto' }}>
      <div style={{ maxWidth: '35rem', width: '100vw' }} className="bg-body-tertiary shadow-sm p-3 rounded-4">
        <InputFormControl
          caption="Подкатегория"
          setIsOpened={setIsShowInput}
          onClear={() => setFormData({ name: '', iconName: 'Card', description: '' })}
          onAdd={addFunction}
        ></InputFormControl>
        <SubcategoryForm formData={formData} setFormData={setFormData} />
      </div>
    </ModalContainer>
  );
};

import React from 'react';
// Input components
import ModalContainer from 'components/small_components/ModalContainer';
import SubcategoryForm from 'components/pages/categories_page/subcategory_form/SubcategoryForm';
import InputBar from 'components/small_components/control_panels/InputBar';
import { serverResponseStatusHooks, subcategoryAddType } from 'store/types';
// Store
import { useAppDispatch } from 'store/hook';
import { addSubCategory } from 'store/slices/categoriesSlice';

interface SubcategoryInputProps {
  categoryID: string;
  isShowInput: boolean;
  setIsShowInput: React.Dispatch<React.SetStateAction<boolean>>;
  formData: subcategoryAddType;
  setFormData: React.Dispatch<React.SetStateAction<subcategoryAddType>>;
}

const SubcategoryInput: React.FC<SubcategoryInputProps> = ({
  categoryID,
  isShowInput,
  setIsShowInput,
  formData,
  setFormData,
}) => {
  const dispatch = useAppDispatch();

  const addFunction = (statusHooks: serverResponseStatusHooks) => {
    dispatch(
      addSubCategory({
        categoryID,
        subcategory: formData,
        ...statusHooks,
      }),
    );
  };

  return (
    <ModalContainer
      isOpened={isShowInput}
      setIsOpened={setIsShowInput}
      style={{ maxWidth: '35rem', width: '100vw' }}
      className="bg-body-tertiary shadow-sm p-3 rounded-4"
    >
      <InputBar
        addButtonLabel="Подкатегория"
        setIsOpened={setIsShowInput}
        clearFunction={() => setFormData({ name: '', iconName: 'Card', description: '' })}
        addFunction={addFunction}
      ></InputBar>
      <SubcategoryForm formData={formData} setFormData={setFormData}></SubcategoryForm>
    </ModalContainer>
  );
};

export default SubcategoryInput;

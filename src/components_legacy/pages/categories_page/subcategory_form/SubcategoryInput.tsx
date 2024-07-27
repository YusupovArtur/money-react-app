import { Dispatch, FC, SetStateAction } from 'react';
// Input components
import ModalContainer from 'shared/containers/ModalContainer';
import InputFormBar from 'entities/InputFormBar';
import SubcategoryForm from '../../../pages/categories_page/subcategory_form/SubcategoryForm';
import { serverResponseStatusHooks, subcategoryAddType } from 'store/types';
// Store
import { useAppDispatch } from 'store/hook';
import { addSubCategory } from 'store/slices/categoriesSlice';

interface SubcategoryInputProps {
  categoryID: string;
  isShowInput: boolean;
  setIsShowInput: Dispatch<SetStateAction<boolean>>;
  formData: subcategoryAddType;
  setFormData: Dispatch<SetStateAction<subcategoryAddType>>;
}

const SubcategoryInput: FC<SubcategoryInputProps> = ({ categoryID, isShowInput, setIsShowInput, formData, setFormData }) => {
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
    <ModalContainer isOpened={isShowInput} setIsOpened={setIsShowInput} style={{ margin: 'auto' }}>
      <div style={{ maxWidth: '35rem', width: '100vw' }} className="bg-body-tertiary shadow-sm p-3 rounded-4">
        <InputFormBar
          addButtonsLabel="Подкатегория"
          setIsOpened={setIsShowInput}
          onClear={() => setFormData({ name: '', iconName: 'Card', description: '' })}
          onAdd={addFunction}
        ></InputFormBar>
        <SubcategoryForm formData={formData} setFormData={setFormData} />
      </div>
    </ModalContainer>
  );
};

export default SubcategoryInput;

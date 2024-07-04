import React, { useState } from 'react';
// Input components
import ModalContainer from 'components/small_components/ModalContainer';
import InputBar from 'components/small_components/control_panels/InputBar';
import CategoryForm from 'components/pages/categories_page/categories_form/CategoryForm';
import { categoryAddType, serverResponseStatusHooks } from 'store/types';
// Store
import { useAppDispatch } from 'store/hook';
import { addCategory } from 'store/slices/categoriesSlice';

const CategoryInput: React.FC<{
  isShowInput: boolean;
  setIsShowInput: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isShowInput, setIsShowInput }) => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<categoryAddType>({
    name: '',
    iconName: 'Card',
    color: '#ced4da',
    type: 'expense',
    description: '',
  });

  const addFunction = (statusHooks: serverResponseStatusHooks) => {
    dispatch(addCategory({ ...statusHooks, category: formData }));
  };

  return (
    <ModalContainer
      isOpened={isShowInput}
      setIsOpened={setIsShowInput}
      style={{ maxWidth: '35rem', width: '100vw' }}
      className="bg-body-tertiary shadow-sm p-3 rounded-4"
    >
      <InputBar
        addButtonLabel="Категория"
        setIsOpened={setIsShowInput}
        clearFunction={() => setFormData({ name: '', iconName: 'Card', color: '#ced4da', type: 'expense', description: '' })}
        addFunction={addFunction}
      ></InputBar>
      <CategoryForm formData={formData} setFormData={setFormData}></CategoryForm>
    </ModalContainer>
  );
};

export default CategoryInput;

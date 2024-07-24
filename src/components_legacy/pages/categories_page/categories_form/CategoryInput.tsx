import { Dispatch, FC, SetStateAction, useState } from 'react';
// Input components
import ModalContainer from 'shared/containers/ModalContainer';
import InputFormBar from 'entities/InputFormBar';
import CategoryForm from '../../../pages/categories_page/categories_form/CategoryForm';
import { categoryAddType, serverResponseStatusHooks } from 'store/types';
// Store
import { useAppDispatch } from 'store/hook';
import { addCategory } from 'store/slices/categoriesSlice';

const CategoryInput: FC<{
  isShowInput: boolean;
  setIsShowInput: Dispatch<SetStateAction<boolean>>;
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
    <ModalContainer isOpened={isShowInput} setIsOpened={setIsShowInput} style={{ margin: 'auto' }}>
      <div style={{ maxWidth: '35rem', width: '100vw' }} className="bg-body-tertiary shadow-sm p-3 rounded-4">
        <InputFormBar
          addButtonsLabel="Категория"
          setIsOpened={setIsShowInput}
          onClear={() =>
            setFormData({
              name: '',
              iconName: 'Card',
              color: '#ced4da',
              type: 'expense',
              description: '',
            })
          }
          onAdd={addFunction}
        ></InputFormBar>
        <CategoryForm formData={formData} setFormData={setFormData}></CategoryForm>
      </div>
    </ModalContainer>
  );
};

export default CategoryInput;

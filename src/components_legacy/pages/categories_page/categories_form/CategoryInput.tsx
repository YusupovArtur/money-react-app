import { Dispatch, FC, SetStateAction, useState } from 'react';
// Input components
import { ModalContainer } from 'shared/containers';
import InputFormBar from 'entities/InputFormBar';
import { CategoryForm } from '../../../pages/categories_page/categories_form/CategoryForm';
// Store
import { ResponseHooksType, useAppDispatch } from 'store';
import { addCategory, CategoryAddType } from 'store/slices/categoriesSlice';

export const CategoryInput: FC<{
  isShowInput: boolean;
  setIsShowInput: Dispatch<SetStateAction<boolean>>;
}> = ({ isShowInput, setIsShowInput }) => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<CategoryAddType>({
    name: '',
    iconName: 'Card',
    color: '#ced4da',
    type: 'expense',
    description: '',
  });

  const addFunction = (statusHooks: ResponseHooksType) => {
    dispatch(addCategory({ ...statusHooks, category: formData }));
  };

  return (
    <ModalContainer isOpened={isShowInput} onCollapse={setIsShowInput} style={{ margin: 'auto' }}>
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
        <CategoryForm formData={formData} setFormData={setFormData} />
      </div>
    </ModalContainer>
  );
};

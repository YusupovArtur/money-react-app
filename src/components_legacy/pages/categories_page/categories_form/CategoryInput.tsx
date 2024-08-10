import { Dispatch, FC, SetStateAction, useState } from 'react';
// Input components
import { ModalContainer } from 'shared/containers';
import { InputFormControl } from 'entities/InputFormBar';
import { CategoryForm } from '../../../pages/categories_page/categories_form/CategoryForm';
// Store
import { ResponseHooksType, useAppDispatch } from 'store';
import { addCategory, CategoryAddType } from 'store/slices/categoriesSlice';

interface CategoryInputProps {
  isOpened: boolean;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
}

export const CategoryInput: FC<CategoryInputProps> = ({ isOpened, setIsOpened }) => {
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
    <ModalContainer isOpened={isOpened} onCollapse={setIsOpened} style={{ margin: 'auto' }}>
      <div style={{ maxWidth: '35rem', width: '100vw' }} className="bg-body-tertiary shadow-sm p-3 rounded-4">
        <InputFormControl
          caption="Категория"
          setIsOpened={setIsOpened}
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
        ></InputFormControl>
        <CategoryForm formData={formData} setFormData={setFormData} />
      </div>
    </ModalContainer>
  );
};

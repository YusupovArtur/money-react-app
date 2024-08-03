import { Dispatch, FC, SetStateAction, useState } from 'react';
// Subcategory components_legacy
import { ModalContainer } from 'shared/containers';
import EditFormBar from 'entities/EditFormBar';
import { SubcategoryOpenedInfo } from '../../../pages/categories_page/subcategories_list/SubcategoryOpenedInfo';
import { SubcategoryForm } from '../../../pages/categories_page/subcategory_form/SubcategoryForm';
import { serverResponseStatusHooks, subcategoryAddType, subcategoryType } from 'store/types';
// Store
import { useAppDispatch } from 'store/hook';
import { deleteSubCategory, updateSubCategory } from 'store/slices/categoriesSlice.ts';

export const SubcategoryOpened: FC<{
  subcategory: subcategoryType;
  categoryID: string;
  color: string;
  isOpened: boolean;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
}> = ({ subcategory, categoryID, color, isOpened, setIsOpened }) => {
  const dispatch = useAppDispatch();

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [formData, setFormData] = useState<subcategoryAddType>({
    name: subcategory.name,
    iconName: subcategory.iconName,
    description: subcategory.description,
  });

  const clearFunction = () => {
    setFormData({
      name: subcategory.name,
      iconName: subcategory.iconName,
      description: subcategory.description,
    });
  };

  const deleteFunction = (statusHooks: serverResponseStatusHooks) => {
    dispatch(
      deleteSubCategory({
        categoryID,
        subcategoryID: subcategory.id,
        ...statusHooks,
      }),
    );
  };

  const updateFunction = (statusHooks: serverResponseStatusHooks) => {
    dispatch(
      updateSubCategory({
        categoryID,
        subcategoryID: subcategory.id,
        newProps: formData,
        ...statusHooks,
      }),
    );
  };

  return (
    <ModalContainer isOpened={isOpened} onCollapse={isEdit ? undefined : setIsOpened} style={{ margin: 'auto' }}>
      <div style={{ maxWidth: '40rem', width: '100vw' }} className="d-flex flex-column bg-body-tertiary shadow-sm p-3 rounded-4">
        <EditFormBar
          onClose={() => setIsOpened(false)}
          onClear={clearFunction}
          onDelete={deleteFunction}
          onUpdate={updateFunction}
          itemType="подкатегорию"
          itemName={subcategory.name}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
        ></EditFormBar>
        {isEdit ? (
          <SubcategoryForm formData={formData} setFormData={setFormData} />
        ) : (
          <SubcategoryOpenedInfo subcategory={subcategory} color={color} />
        )}
      </div>
    </ModalContainer>
  );
};

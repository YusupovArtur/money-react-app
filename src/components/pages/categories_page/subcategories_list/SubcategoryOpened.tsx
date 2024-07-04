import React, { useState } from 'react';
// Subcategory components
import ModalContainer from 'components/small_components/ModalContainer';
import EditBar from 'components/small_components/control_panels/EditBar';
import SubcategoryOpenedInfo from 'components/pages/categories_page/subcategories_list/SubcategoryOpenedInfo';
import SubcategoryForm from 'components/pages/categories_page/subcategory_form/SubcategoryForm';
import { serverResponseStatusHooks, subcategoryAddType, subcategoryType } from 'store/types';
// Store
import { useAppDispatch } from 'store/hook';
import { updateSubCategory, deleteSubCategory } from 'store/slices/categoriesSlice';

const SubcategoryOpened: React.FC<{
  subcategory: subcategoryType;
  categoryID: string;
  color: string;
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
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
        categoryID: categoryID,
        subcategoryID: subcategory.id,
        ...statusHooks,
      }),
    );
  };

  const updateFunction = (statusHooks: serverResponseStatusHooks) => {
    dispatch(
      updateSubCategory({
        categoryID: categoryID,
        subcategoryID: subcategory.id,
        newProps: formData,
        ...statusHooks,
      }),
    );
  };

  return (
    <ModalContainer
      isOpened={isOpened}
      setIsOpened={isEdit ? undefined : setIsOpened}
      style={{ maxWidth: '40rem', width: '100vw' }}
      className="d-flex flex-column bg-body-tertiary shadow-sm p-3 rounded-4"
    >
      <EditBar
        closeFunction={() => setIsOpened(false)}
        clearFunction={clearFunction}
        deleteFunction={deleteFunction}
        updateFunction={updateFunction}
        itemType="подкатегорию"
        itemName={subcategory.name}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
      ></EditBar>
      {isEdit ? (
        <SubcategoryForm formData={formData} setFormData={setFormData}></SubcategoryForm>
      ) : (
        <SubcategoryOpenedInfo subcategory={subcategory} color={color}></SubcategoryOpenedInfo>
      )}
    </ModalContainer>
  );
};

export default SubcategoryOpened;

import { Dispatch, FC, SetStateAction, useState } from 'react';
// Subcategory components_legacy
import ModalContainer from 'shared/layouts/ModalContainer/ModalContainer.tsx';
import EditBar from '../../../small_components/control_panels/EditBar';
import SubcategoryOpenedInfo from '../../../pages/categories_page/subcategories_list/SubcategoryOpenedInfo';
import SubcategoryForm from '../../../pages/categories_page/subcategory_form/SubcategoryForm';
import { serverResponseStatusHooks, subcategoryAddType, subcategoryType } from 'store/types';
// Store
import { useAppDispatch } from 'store/hook';
import { deleteSubCategory, updateSubCategory } from 'store/slices/categoriesSlice';

const SubcategoryOpened: FC<{
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
    <ModalContainer isOpened={isOpened} setIsOpened={isEdit ? undefined : setIsOpened}>
      <div style={{ maxWidth: '40rem', width: '100vw' }} className="d-flex flex-column bg-body-tertiary shadow-sm p-3 rounded-4">
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
      </div>
    </ModalContainer>
  );
};

export default SubcategoryOpened;

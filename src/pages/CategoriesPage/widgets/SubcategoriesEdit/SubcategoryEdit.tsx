import { FC, useEffect, useState } from 'react';
// Subcategory components_legacy
import { ModalWindowContainer } from 'shared/containers';
import { EditFromControl } from 'entities/EditFormControl';
import { SubcategoryEditInfo } from 'pages/CategoriesPage/widgets/SubcategoriesEdit/SubcategoryEditInfo.tsx';
import { SubcategoryForm } from 'pages/CategoriesPage/forms/SubcategoryForm.tsx';
// Store
import { useAppDispatch, useAppSelector } from 'store/index.ts';
import {
  deleteSubCategory,
  selectCategory,
  selectSubcategory,
  SubcategoryType,
  updateSubCategory,
} from 'store/slices/categoriesSlice';
import { ResponseHooksType } from 'store/types/ResponseHooksType.ts';
import { useSearchParams } from 'react-router-dom';
import { MODAL_CONTAINER_ANIMATION_DURATION } from 'shared/containers/ModalContainer/ModalContainer.tsx';
import { useGetSubcategoryFormValidation } from 'pages/CategoriesPage/forms/helpers/useGetSubcatetegoryFormValidation.ts';
import { useTimeoutRefWithClear } from 'shared/hooks';

export const SubcategoryEdit: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryID = searchParams.get('categoryID');
  const subcategoryID = searchParams.get('subcategoryID');

  const category = useAppSelector(selectCategory(categoryID));
  const subcategory = useAppSelector(selectSubcategory({ categoryID, subcategoryID }));
  const isLoading = useAppSelector((state) => state.categories.responseState.isLoading);
  const defaultValue: SubcategoryType = {
    name: subcategory?.name || '',
    iconName: subcategory?.iconName || '',
    description: subcategory?.description || '',
  };

  useEffect(() => {
    if (isLoading === false && subcategoryID !== null && !subcategory) {
      alert(`Подкатегории с ID "${subcategoryID}" не существует`);
      searchParams.delete('subcategoryID');
      setSearchParams(searchParams);
    }
    onClear();
  }, [isLoading, subcategoryID, subcategory]);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [formData, setFormData] = useState<SubcategoryType>(defaultValue);
  const [isOpened, setIsOpened] = useState<boolean>(true);
  const timeoutRef = useTimeoutRefWithClear();

  // Callbacks
  const handleClose = () => {
    setIsOpened(false);
    timeoutRef.current = setTimeout(() => {
      searchParams.delete('subcategoryID');
      setSearchParams(searchParams);
    }, MODAL_CONTAINER_ANIMATION_DURATION);
  };

  const onClear = () => {
    setFormData(defaultValue);
  };

  const dispatch = useAppDispatch();
  const updateFunction = (statusHooks: ResponseHooksType) => {
    if (categoryID !== null && subcategoryID !== null) {
      dispatch(updateSubCategory({ categoryID, subcategoryID, subcategoryProps: formData, ...statusHooks }));
    }
  };
  const onUpdateFulfilled = () => {
    setIsEdit(false);
  };

  const deleteFunction = (statusHooks: ResponseHooksType) => {
    if (categoryID !== null && subcategoryID !== null) {
      dispatch(deleteSubCategory({ categoryID, subcategoryID, ...statusHooks }));
    }
  };
  const onDeleteFulfilled = () => {
    searchParams.delete('subcategoryID');
    setSearchParams(searchParams);
  };

  // Validation
  const { setIsValidate, validation, setValidateFields } = useGetSubcategoryFormValidation(formData);

  if (!category || !subcategory) {
    return null;
  }

  return (
    <ModalWindowContainer
      isOpened={isOpened}
      onClose={handleClose}
      onCollapse={isEdit ? undefined : handleClose}
      style={{ margin: 'auto' }}
    >
      {isEdit ? (
        <SubcategoryForm formData={formData} setFormData={setFormData} validation={validation} setIsValidate={setIsValidate} />
      ) : (
        <SubcategoryEditInfo subcategory={subcategory} color={category.color} />
      )}

      <EditFromControl
        disabled={!validation.isValid}
        setValidate={setValidateFields}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        onUpdate={updateFunction}
        onDelete={deleteFunction}
        onUpdateFulfilled={onUpdateFulfilled}
        onDeleteFulfilled={onDeleteFulfilled}
        onClear={onClear}
        captions={{ itemType: 'Подкатегорию', itemName: subcategory.name }}
      ></EditFromControl>
    </ModalWindowContainer>
  );
};

import { FC, useEffect, useRef, useState } from 'react';
// Subcategory components_legacy
import { ModalWindowContainer } from 'shared/containers';
import { EditFromControl } from 'entities/EditFormControl';
import { SubcategoryEditInfo } from 'pages/CategoriesPage/widgets/SubcategoriesEdit/SubcategoryEditInfo.tsx';
import { SubcategoryForm } from 'pages/CategoriesPage/forms/SubcategoryForm.tsx';
// Store
import { useAppDispatch, useAppSelector } from 'store/index.ts';
import { deleteSubCategory, SubcategoryType, updateSubCategory } from 'store/slices/categoriesSlice';
import { ResponseHooksType } from 'store/types/ResponseHooksType.ts';
import { useSearchParams } from 'react-router-dom';
import { useFormValidation } from 'shared/hooks';
import { nameValidator } from 'shared/hooks/useFormValidation/validators';
import { MODAL_CONTAINER_ANIMATION_DURATION } from 'shared/containers/ModalContainer/ModalContainer.tsx';

export const SubcategoryEdit: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryID = searchParams.get('categoryID');
  const subcategoryID = searchParams.get('subcategoryID');

  const category = categoryID !== null ? useAppSelector((state) => state.categories.list[categoryID]) : undefined;
  const subcategory = category ? (subcategoryID !== null ? category.subcategories.list[subcategoryID] : undefined) : undefined;
  const isLoading = useAppSelector((state) => state.categories.responseState.isLoading);

  useEffect(() => {
    if (isLoading === false && subcategoryID !== null && !subcategory) {
      alert(`Подкатегории с ID "${subcategoryID}" не существует`);
      searchParams.delete('subcategoryID');
      setSearchParams(searchParams);
    }
    onClear();
  }, [isLoading, subcategoryID, subcategory]);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [formData, setFormData] = useState<SubcategoryType>({
    name: subcategory?.name || '',
    iconName: subcategory?.iconName || '',
    description: subcategory?.description || '',
  });

  // Callbacks
  const handleClose = () => {
    setIsOpened(false);
    setTimeout(() => {
      searchParams.delete('subcategoryID');
      setSearchParams(searchParams);
    }, MODAL_CONTAINER_ANIMATION_DURATION);
  };

  const onClear = () => {
    setFormData({
      name: subcategory?.name || '',
      iconName: subcategory?.iconName || 'Card',
      description: subcategory?.description || '',
    });
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

  // Modal container state
  const [isOpened, setIsOpened] = useState<boolean>(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Validation
  const [isValidate, setIsValidate] = useState<{ [K in keyof SubcategoryType]?: boolean }>({
    name: Boolean(formData.name),
  });
  const validation = useFormValidation<SubcategoryType>(
    formData,
    {
      name: nameValidator,
    },
    isValidate,
  );
  const setValidateFields = () => {
    setIsValidate({ name: true });
  };

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
        setValidateFields={setValidateFields}
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

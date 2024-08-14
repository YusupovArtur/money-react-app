import { FC, useEffect, useState } from 'react';
// Categories imports
import { EditFromControl } from 'entities/EditFormControl';
import { CategoryForm } from 'pages/CategoriesPage/forms/CategoryForm.tsx';
import { CategoryEditInfo } from 'pages/CategoriesPage/widgets/CategoryEdit/ui/CategoryEditInfo.tsx';
// Subcategories imports
import { SubcategoriesList } from 'pages/CategoriesPage/widgets/SubcategoriesList/SubcategoriesList.tsx';
import { PlusIconSVG } from 'components_legacy/small_components/icons_svg/IconsSVG.tsx';
// Store
import { useAppDispatch, useAppSelector } from 'store/index.ts';
import { CategoryAddType, deleteCategory, updateCategory } from 'store/slices/categoriesSlice';
import { PageContentWrapper } from 'shared/wrappers';
import { ResponseHooksType } from 'store/types/ResponseHooksType.ts';
import { ButtonWithIcon, EditWindowPlaceholder } from 'shared/ui';
import { useSearchParams } from 'react-router-dom';
import { useFormValidation } from 'shared/hooks';
import { nameValidator } from 'shared/hooks/useFormValidation/validators';
import { typeValidator } from 'pages/CategoriesPage/forms/helpers/typeValidator.ts';
import { SubcategoryInput } from 'pages/CategoriesPage/widgets/SubcategoryInput/SubcategoryInput.tsx';
import { CategoryEditPlaceholder } from 'pages/CategoriesPage/widgets/CategoryEdit/ui/CategoryEditPlaceholder.tsx';
import { SubcategoryEdit } from 'pages/CategoriesPage/widgets/SubcategoriesEdit/SubcategoryEdit.tsx';

export const CategoryEdit: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryID = searchParams.get('categoryID');
  const subcategoryID = searchParams.get('subcategoryID');

  const category = categoryID !== null ? useAppSelector((state) => state.categories.list[categoryID]) : undefined;
  const isLoading = useAppSelector((state) => state.categories.responseState.isLoading);

  useEffect(() => {
    if (isLoading === false && categoryID !== null && !category) {
      alert(`Категории с ID "${categoryID}" не существует`);
      searchParams.delete('categoryID');
      searchParams.delete('subcategoryID');
      setSearchParams(searchParams);
    }
    onClear();
  }, [isLoading, categoryID, category]);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isOpenedSubcategoryInput, setIsOpenedSubcategoryInput] = useState<boolean>(false);
  const [formData, setFormData] = useState<CategoryAddType>({
    name: category?.name || '',
    iconName: category?.iconName || 'Card',
    color: category?.color || '#ced4da',
    type: category?.type || 'expense',
    description: category?.description || '',
  });

  // Callbacks
  const onClose = () => {
    searchParams.delete('categoryID');
    searchParams.delete('subcategoryID');
    setSearchParams(searchParams);
  };

  const onClear = () => {
    setFormData({
      name: category?.name || '',
      iconName: category?.iconName || 'Card',
      color: category?.color || '#ced4da',
      type: category?.type || 'expense',
      description: category?.description || '',
    });
  };

  const dispatch = useAppDispatch();
  const updateFunction = (statusHooks: ResponseHooksType) => {
    if (categoryID !== null) {
      dispatch(updateCategory({ categoryID, categoryProps: formData, ...statusHooks }));
    }
  };
  const onUpdateFulfilled = () => {
    setIsEdit(false);
  };

  const deleteFunction = (statusHooks: ResponseHooksType) => {
    if (categoryID !== null) {
      dispatch(deleteCategory({ categoryID, ...statusHooks }));
    }
  };
  const onDeleteFulfilled = () => {
    searchParams.delete('categoryID');
    searchParams.delete('subcategoryID');
    setSearchParams(searchParams);
  };

  // Validation
  const [isValidate, setIsValidate] = useState<{ [K in keyof CategoryAddType]?: boolean }>({
    name: Boolean(formData.name),
    type: Boolean(formData.type),
  });
  const validation = useFormValidation<CategoryAddType>(
    formData,
    {
      name: nameValidator,
      type: typeValidator,
    },
    isValidate,
  );
  const setValidateFields = () => {
    setIsValidate({ name: true, type: true });
  };

  // Return null if not find id
  if (categoryID === null) {
    return null;
  }

  if (!category) {
    if (subcategoryID === null) {
      return <CategoryEditPlaceholder />;
    } else {
      return (
        <>
          <CategoryEditPlaceholder />
          <EditWindowPlaceholder />
        </>
      );
    }
  }

  return (
    <>
      <PageContentWrapper style={{ margin: '0 auto' }} className="pb-0">
        {isEdit ? (
          <button type="button" onClick={onClose} className="btn-close align-self-end"></button>
        ) : (
          <div className="d-flex justify-content-between">
            <ButtonWithIcon
              onClick={() => setIsOpenedSubcategoryInput(true)}
              caption="Подкатегория"
              className="btn-primary align-self-start"
            >
              <PlusIconSVG iconSize="1.2rem" />
            </ButtonWithIcon>
            <button type="button" onClick={onClose} className="btn-close"></button>
          </div>
        )}

        {isEdit ? (
          <CategoryForm formData={formData} setFormData={setFormData} validation={validation} setIsValidate={setIsValidate} />
        ) : (
          <CategoryEditInfo category={category} />
        )}
        <div className="mb-3">
          <EditFromControl
            disabled={!validation.isValid}
            setValidateFields={setValidateFields}
            onClear={onClear}
            onUpdate={updateFunction}
            onDelete={deleteFunction}
            onUpdateFulfilled={onUpdateFulfilled}
            onDeleteFulfilled={onDeleteFulfilled}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            captions={{ itemType: 'Категорию', itemName: category.name }}
          />
        </div>

        {!isEdit && category.subcategories.order.length > 0 && <SubcategoriesList categoryID={categoryID} category={category} />}
      </PageContentWrapper>

      {subcategoryID !== null && <SubcategoryEdit />}
      <SubcategoryInput categoryID={categoryID} isOpened={isOpenedSubcategoryInput} setIsOpened={setIsOpenedSubcategoryInput} />
    </>
  );
};

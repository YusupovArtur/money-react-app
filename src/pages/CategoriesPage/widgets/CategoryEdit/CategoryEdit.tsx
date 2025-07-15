import { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
// Store
import { useAppDispatch, useAppSelector } from 'store/index.ts';
import { CategoryAddType, deleteCategory, selectCategory, updateCategory } from 'store/slices/categoriesSlice';
import { ResponseHooksType } from 'store/types/ResponseHooksType.ts';
// Forms
import { EditFromControl } from 'entities/EditFormControl';
import { useGetCategoryFormValidation } from 'pages/CategoriesPage/forms/helpers/useGetCatetegoryFormValidation.ts';
// Components
import { CategoryForm } from '../../forms/CategoryForm.tsx';
import { CategoryEditInfo } from './ui/CategoryEditInfo.tsx';
import { SubcategoryInput } from '../SubcategoryInput/SubcategoryInput.tsx';
import { SubcategoriesList } from '../SubcategoriesList/SubcategoriesList.tsx';
import { SubcategoryEdit } from '../SubcategoriesEdit/SubcategoryEdit.tsx';
// UI
import { CategoryEditPlaceholder } from './ui/CategoryEditPlaceholder.tsx';
import { ButtonWithIcon, EditWindowPlaceholder, PageContentWrapper } from 'shared/ui';
import { PlusIcon } from 'shared/icons';

// TODO: Add ESC key for exit
export const CategoryEdit: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryID = searchParams.get('categoryID');
  const subcategoryID = searchParams.get('subcategoryID');

  const category = useAppSelector(selectCategory(categoryID));
  const isLoading = useAppSelector((state) => state.categories.responseState.isLoading);
  const defaultValue: CategoryAddType = {
    name: category?.name || '',
    iconName: category?.iconName || 'Card',
    color: category?.color || '#ced4da',
    type: category?.type || 'expense',
    description: category?.description || '',
  };

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
  const [formData, setFormData] = useState<CategoryAddType>(defaultValue);

  // Callbacks
  const onClose = () => {
    searchParams.delete('categoryID');
    searchParams.delete('subcategoryID');
    setSearchParams(searchParams);
  };

  const onClear = () => {
    setFormData(defaultValue);
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
      dispatch(deleteCategory({ id: categoryID, ...statusHooks }));
    }
  };
  const onDeleteFulfilled = () => {
    searchParams.delete('categoryID');
    searchParams.delete('subcategoryID');
    setSearchParams(searchParams);
  };

  // Validation
  const { setIsValidate, validation, setValidateFields } = useGetCategoryFormValidation(formData);

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
      <PageContentWrapper style={{ margin: '0 auto' }}>
        {isEdit ? (
          <button type="button" onClick={onClose} className="btn-close align-self-end"></button>
        ) : (
          <div className="d-flex justify-content-between">
            <ButtonWithIcon
              onClick={() => setIsOpenedSubcategoryInput(true)}
              caption="Подкатегория"
              className="btn-primary align-self-start"
            >
              <PlusIcon iconSize="1.2rem" />
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
            setValidate={setValidateFields}
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

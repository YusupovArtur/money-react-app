import React, { useState, useEffect } from 'react';
// Categories imports
import CategoryForm from 'components/pages/categories_page/categories_form/CategoryForm';
import EditBar from 'components/small_components/control_panels/EditBar';
import CategoryOpenedInfo from 'components/pages/categories_page/categories_list/CategoryOpenedInfo';
// Subcategories imports
import SubcategoriesList from 'components/pages/categories_page/subcategories_list/SubcategoriesList';
import SubcategoryInput from 'components/pages/categories_page/subcategory_form/SubcategoryInput';
import { categoryType, categoryAddType, subcategoryAddType } from 'store/types';
import { PlusIconSVG } from 'components/small_components/icons_svg/IconsSVG';
// Store
import { useAppDispatch } from 'store/hook';
import { updateCategory, deleteCategory } from 'store/slices/categoriesSlice';

const CategoryOpened: React.FC<{
  openedCategory: { category: categoryType; isOpened: boolean };
  setOpenedCategory: React.Dispatch<React.SetStateAction<{ category: categoryType; isOpened: boolean }>>;
}> = ({ openedCategory, setOpenedCategory }) => {
  const dispatch = useAppDispatch();

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isShowInput, setIsShowInput] = useState<boolean>(false);

  const [formData, setFormData] = useState<categoryAddType>({
    name: '',
    iconName: 'Card',
    color: '',
    type: 'expense',
    description: '',
  });

  const [subcategoryFormData, setSubcategoryFormData] = useState<subcategoryAddType>({
    name: '',
    iconName: 'Card',
    description: '',
  });

  useEffect(() => {
    setFormData({
      name: openedCategory.category.name,
      iconName: openedCategory.category.iconName,
      color: openedCategory.category.color,
      type: openedCategory.category.type,
      description: openedCategory.category.description,
    });
  }, [openedCategory, isEdit]);

  const closeFunction = () => {
    setOpenedCategory({
      isOpened: false,
      category: { id: '', name: '', iconName: '', color: '', type: 'expense', description: '', subcategories: [] },
    });
  };

  const clearFunction = () => {
    setFormData({
      name: openedCategory.category.name,
      iconName: openedCategory.category.iconName,
      color: openedCategory.category.color,
      type: openedCategory.category.type,
      description: openedCategory.category.description,
    });
  };

  const deleteFunction = (
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
    isOk: React.MutableRefObject<boolean>,
  ) => {
    dispatch(
      deleteCategory({
        categoryID: openedCategory.category.id,
        isOk: isOk,
        setIsLoading: setIsLoading,
        setErrorMessage: setErrorMessage,
      }),
    );
  };

  const updateFunction = (
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
    isOk: React.MutableRefObject<boolean>,
  ) => {
    dispatch(
      updateCategory({
        categoryID: openedCategory.category.id,
        newProps: formData,
        setErrorMessage: setErrorMessage,
        setIsLoading: setIsLoading,
        isOk: isOk,
      }),
    );
  };

  return (
    <div
      style={{ maxWidth: '45rem', width: '100vw' }}
      className="align-self-start bg-body-tertiary shadow-sm rounded-4 px-3 pt-3"
    >
      <EditBar
        closeFunction={closeFunction}
        clearFunction={clearFunction}
        deleteFunction={deleteFunction}
        updateFunction={updateFunction}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        itemType="категорию"
        itemName={openedCategory.category.name}
      ></EditBar>
      {isEdit ? (
        <>
          <CategoryForm formData={formData} setFormData={setFormData}></CategoryForm>
          <div className="mb-3"></div>
        </>
      ) : (
        <>
          <CategoryOpenedInfo category={openedCategory.category}></CategoryOpenedInfo>
          <button
            onClick={() => setIsShowInput(true)}
            className="btn btn-primary d-flex justify-content-between align-items-center mt-4"
          >
            <PlusIconSVG iconSize="1.2rem"></PlusIconSVG>
            <span className="ms-1">Подкатегория</span>
          </button>
          <SubcategoriesList category={openedCategory.category}></SubcategoriesList>
        </>
      )}

      <SubcategoryInput
        categoryID={openedCategory.category.id}
        isShowInput={isShowInput}
        setIsShowInput={setIsShowInput}
        formData={subcategoryFormData}
        setFormData={setSubcategoryFormData}
      ></SubcategoryInput>
    </div>
  );
};

export default CategoryOpened;

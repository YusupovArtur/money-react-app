import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
// Categories imports
import EditFormBar from 'entities/EditFormBar';
import { CategoryForm } from '../../../pages/categories_page/categories_form/CategoryForm';
import { CategoryOpenedInfo } from '../../../pages/categories_page/categories_list/CategoryOpenedInfo';
// Subcategories imports
import { SubcategoriesList } from '../../../pages/categories_page/subcategories_list/SubcategoriesList';
import { SubcategoryInput } from '../../../pages/categories_page/subcategory_form/SubcategoryInput';
import { categoryAddType, categoryType, serverResponseStatusHooks, subcategoryAddType } from 'store/types';
import { PlusIconSVG } from '../../../small_components/icons_svg/IconsSVG';
// Store
import { useAppDispatch } from 'store/hook';
import { deleteCategory, updateCategory } from 'store/slices/categoriesSlice.ts';
import { PageContentWrapper } from 'shared/wrappers';
import { ButtonWithIcon } from 'shared/ui';

export const CategoryOpened: FC<{
  openedCategory: { category: categoryType; isOpened: boolean };
  setOpenedCategory: Dispatch<SetStateAction<{ category: categoryType; isOpened: boolean }>>;
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

  const deleteFunction = (statusHooks: serverResponseStatusHooks) => {
    dispatch(
      deleteCategory({
        categoryID: openedCategory.category.id,
        ...statusHooks,
      }),
    );
  };

  const updateFunction = (statusHooks: serverResponseStatusHooks) => {
    dispatch(
      updateCategory({
        categoryID: openedCategory.category.id,
        newProps: formData,
        ...statusHooks,
      }),
    );
  };

  return (
    <PageContentWrapper style={{ margin: '0 auto' }} className="pb-0">
      <EditFormBar
        onClose={closeFunction}
        onClear={clearFunction}
        onDelete={deleteFunction}
        onUpdate={updateFunction}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        itemType="категорию"
        itemName={openedCategory.category.name}
      />
      {isEdit ? (
        <>
          <CategoryForm formData={formData} setFormData={setFormData} />
          <div className="mb-3"></div>
        </>
      ) : (
        <>
          <CategoryOpenedInfo category={openedCategory.category} />
          <ButtonWithIcon
            onClick={() => setIsShowInput(true)}
            caption="Подкатегория"
            className="btn-primary align-self-start mt-4"
          >
            <PlusIconSVG iconSize="1.2rem" />
          </ButtonWithIcon>
          <SubcategoriesList category={openedCategory.category} />
        </>
      )}

      <SubcategoryInput
        categoryID={openedCategory.category.id}
        isShowInput={isShowInput}
        setIsShowInput={setIsShowInput}
        formData={subcategoryFormData}
        setFormData={setSubcategoryFormData}
      />
    </PageContentWrapper>
  );
};

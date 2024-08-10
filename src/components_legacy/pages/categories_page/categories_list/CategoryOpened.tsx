import { FC, useEffect, useState } from 'react';
// Categories imports
import { EditFromControl } from 'entities/EditFormBar';
import { CategoryForm } from '../../../pages/categories_page/categories_form/CategoryForm';
import { CategoryOpenedInfo } from '../../../pages/categories_page/categories_list/CategoryOpenedInfo';
// Subcategories imports
import { SubcategoriesList } from '../../../pages/categories_page/subcategories_list/SubcategoriesList';
import { SubcategoryInput } from '../../../pages/categories_page/subcategory_form/SubcategoryInput';
import { PlusIconSVG } from '../../../small_components/icons_svg/IconsSVG';
// Store
import { useAppDispatch, useAppSelector } from 'store';
import { CategoryAddType, deleteCategory, SubcategoryType, updateCategory } from 'store/slices/categoriesSlice';
import { PageContentWrapper } from 'shared/wrappers';
import { ResponseHooksType } from 'store/types/ResponseHooksType.ts';
import { ButtonWithIcon } from 'shared/ui';

interface CategoryOpenedProps {
  id: string;
  setID: (id: string) => void;
}

export const CategoryOpened: FC<CategoryOpenedProps> = ({ id, setID }) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.list);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isShowInput, setIsShowInput] = useState<boolean>(false);

  const [formData, setFormData] = useState<CategoryAddType>({
    name: '',
    iconName: 'Card',
    color: '',
    type: 'expense',
    description: '',
  });

  const [subcategoryFormData, setSubcategoryFormData] = useState<SubcategoryType>({
    name: '',
    iconName: 'Card',
    description: '',
  });

  useEffect(() => {
    setFormData({
      name: categories[id].name,
      iconName: categories[id].iconName,
      color: categories[id].color,
      type: categories[id].type,
      description: categories[id].description,
    });
  }, [id, isEdit]);

  const closeFunction = () => {
    setID('');
  };

  const clearFunction = () => {
    setFormData({
      name: categories[id].name,
      iconName: categories[id].iconName,
      color: categories[id].color,
      type: categories[id].type,
      description: categories[id].description,
    });
  };

  const deleteFunction = (statusHooks: ResponseHooksType) => {
    dispatch(deleteCategory({ categoryID: id, ...statusHooks }));
  };

  const updateFunction = (statusHooks: ResponseHooksType) => {
    dispatch(
      updateCategory({
        categoryID: id,
        categoryProps: formData,
        ...statusHooks,
      }),
    );
  };

  return (
    <PageContentWrapper style={{ margin: '0 auto' }} className="pb-0">
      <EditFromControl
        onClear={clearFunction}
        onDelete={deleteFunction}
        onUpdate={updateFunction}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        captions={{ itemType: 'Категорию', itemName: categories[id].name }}
      />
      {isEdit ? (
        <>
          <CategoryForm formData={formData} setFormData={setFormData} />
          <div className="mb-3"></div>
        </>
      ) : (
        <>
          <CategoryOpenedInfo category={categories[id]} />
          <ButtonWithIcon
            onClick={() => setIsShowInput(true)}
            caption="Подкатегория"
            className="btn-primary align-self-start mt-4"
          >
            <PlusIconSVG iconSize="1.2rem" />
          </ButtonWithIcon>
          <SubcategoriesList categoryID={id} category={categories[id]} />
        </>
      )}

      <SubcategoryInput
        categoryID={id}
        isShowInput={isShowInput}
        setIsShowInput={setIsShowInput}
        formData={subcategoryFormData}
        setFormData={setSubcategoryFormData}
      />
    </PageContentWrapper>
  );
};

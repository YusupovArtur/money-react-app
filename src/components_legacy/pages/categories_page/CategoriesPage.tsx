import { useState, useEffect, FC } from 'react';
import { useAppSelector } from 'store/hook.ts';

import CategoryInput from '../../pages/categories_page/categories_form/CategoryInput';
import CategoriesList from '../../pages/categories_page/categories_list/CategoriesList';
import CategoryOpened from '../../pages/categories_page/categories_list/CategoryOpened';

import CategoriesFilter from '../../pages/categories_page/CategoriesFilter';
import { PlusIconSVG } from '../../small_components/icons_svg/IconsSVG';
import { categoryType } from 'store/types';

const CategoriesPage: FC = () => {
  const categories = useAppSelector((state) => state.categories.list);

  const [filter, setFilter] = useState<'all' | 'expense' | 'income' | 'transfer'>('all');
  const categoriesFiltered = categories.filter((category) => (filter === 'all' ? true : category.type === filter));

  const [isShowInput, setIsShowInput] = useState<boolean>(false);

  const [openedCategory, setOpenedCategory] = useState<{ category: categoryType; isOpened: boolean }>({
    isOpened: false,
    category: {
      id: '',
      name: '',
      iconName: '',
      color: '',
      type: 'expense',
      description: '',
      subcategories: [],
    },
  });

  useEffect(() => {
    if (openedCategory.category.id && openedCategory.isOpened) {
      const openedCategoryIndex = categories.findIndex((category) => category.id === openedCategory.category.id);
      if (openedCategoryIndex > -1) {
        setOpenedCategory((state) => ({ ...state, category: categories[openedCategoryIndex] }));
      } else {
        setOpenedCategory({
          isOpened: false,
          category: {
            id: '',
            name: '',
            iconName: '',
            color: '',
            type: 'expense',
            description: '',
            subcategories: [],
          },
        });
      }
    }
  }, [categories]);

  if (openedCategory.isOpened)
    return <CategoryOpened openedCategory={openedCategory} setOpenedCategory={setOpenedCategory}></CategoryOpened>;

  return (
    <div
      style={{ maxWidth: '45rem', width: '100vw' }}
      className="align-self-start bg-body-tertiary shadow-sm rounded-4 px-3 pt-3"
    >
      <div className="d-flex justify-content-between align-items-center flex-wrap-reverse">
        <CategoriesFilter filter={filter} setFilter={setFilter}></CategoriesFilter>
        <button
          onClick={() => setIsShowInput(true)}
          className="btn btn-primary d-flex justify-content-between align-items-center mb-2"
        >
          <PlusIconSVG iconSize="1.2rem"></PlusIconSVG>
          <span className="ms-1">Категория</span>
        </button>
      </div>

      <CategoryInput isShowInput={isShowInput} setIsShowInput={setIsShowInput}></CategoryInput>

      <CategoriesList categories={categoriesFiltered} setOpenedCategory={setOpenedCategory}></CategoriesList>
    </div>
  );
};

export default CategoriesPage;

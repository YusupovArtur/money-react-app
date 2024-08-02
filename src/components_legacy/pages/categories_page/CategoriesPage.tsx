import { FC, useEffect, useState } from 'react';
import { useAppSelector } from 'store/hook';

import { CategoryInput } from '../../pages/categories_page/categories_form/CategoryInput';
import { CategoriesList } from '../../pages/categories_page/categories_list/CategoriesList';
import { CategoryOpened } from '../../pages/categories_page/categories_list/CategoryOpened';

import { CategoriesFilter } from '../../pages/categories_page/CategoriesFilter';
import { PlusIconSVG } from '../../small_components/icons_svg/IconsSVG';
import { categoryType } from 'store/types';
import { PageContentWrapper } from 'shared/wrappers';
import { ButtonWithIcon } from 'shared/ui';

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

  if (openedCategory.isOpened) return <CategoryOpened openedCategory={openedCategory} setOpenedCategory={setOpenedCategory} />;

  return (
    <>
      <PageContentWrapper style={{ margin: '0 auto' }} className="pb-0">
        <div className="d-flex justify-content-between align-items-center flex-wrap-reverse">
          <CategoriesFilter filter={filter} setFilter={setFilter} />
          <ButtonWithIcon caption="Категории" onClick={() => setIsShowInput(true)} className="btn-body-primary mb-1">
            <PlusIconSVG iconSize="1.5rem" />
          </ButtonWithIcon>
        </div>
        <CategoriesList categories={categoriesFiltered} setOpenedCategory={setOpenedCategory} />
      </PageContentWrapper>

      <CategoryInput isShowInput={isShowInput} setIsShowInput={setIsShowInput} />
    </>
  );
};

export default CategoriesPage;

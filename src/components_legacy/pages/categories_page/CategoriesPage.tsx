import { FC, useState } from 'react';
import { useAppSelector } from 'store';

import { CategoryInput } from '../../pages/categories_page/categories_form/CategoryInput';
import { CategoriesList } from '../../pages/categories_page/categories_list/CategoriesList';
import { CategoryOpened } from '../../pages/categories_page/categories_list/CategoryOpened';

import { CategoriesFilter } from '../../pages/categories_page/CategoriesFilter';
import { PlusIconSVG } from '../../small_components/icons_svg/IconsSVG';
import { PageContentWrapper } from 'shared/wrappers';
import { ButtonWithIcon } from 'shared/ui';

const CategoriesPage: FC = () => {
  const categories = useAppSelector((state) => state.categories.list);
  const categoriesOrder = useAppSelector((state) => state.categories.order);

  const [filter, setFilter] = useState<'all' | 'expense' | 'income' | 'transfer'>('all');
  const categoriesOrderFiltered = categoriesOrder.filter((id) => (filter === 'all' ? true : categories[id].type === filter));

  const [isShowInput, setIsShowInput] = useState<boolean>(false);

  const [openedCategoryID, setOpenedCategoryID] = useState('');

  if (categories[openedCategoryID]) return <CategoryOpened id={openedCategoryID} setID={setOpenedCategoryID} />;

  return (
    <>
      <PageContentWrapper style={{ margin: '0 auto' }} className="pb-0">
        <div className="d-flex justify-content-between align-items-center flex-wrap-reverse">
          <CategoriesFilter filter={filter} setFilter={setFilter} />
          <ButtonWithIcon caption="Категории" onClick={() => setIsShowInput(true)} className="btn-body-primary mb-1">
            <PlusIconSVG iconSize="1.5rem" />
          </ButtonWithIcon>
        </div>
        <CategoriesList categoriesOrder={categoriesOrderFiltered} setOpenedCategoryID={setOpenedCategoryID} />
      </PageContentWrapper>

      <CategoryInput isOpened={isShowInput} setIsOpened={setIsShowInput} />
    </>
  );
};

export default CategoriesPage;

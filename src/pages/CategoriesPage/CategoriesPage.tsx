import { FC, useState } from 'react';
// Store
import { useAppSelector } from 'store/store.ts';
import { useSearchParams } from 'react-router-dom';
// Category components
import { CategoriesList } from 'pages/CategoriesPage/widgets/CategoriesList/CategoriesList.tsx';
import { CategoryEdit } from 'pages/CategoriesPage/widgets/CategoryEdit/CategoryEdit.tsx';
import { CategoryInput } from 'pages/CategoriesPage/widgets/CategoryInput/CategoryInput.tsx';
import { CategoriesFilter } from 'pages/CategoriesPage/features/CategoriesFilter.tsx';
// UI
import { ButtonWithIcon, PageContentWrapper } from 'shared/ui';
import { CategoryType } from 'store/slices/categoriesSlice';
import { CategoriesPagePlaceholder } from 'pages/CategoriesPage/ui/CategoriesPagePlaceholder.tsx';
import { PlusIcon } from 'shared/icons/PlusIcon.tsx';

export const CategoriesPage: FC = () => {
  const [filter, setFilter] = useState<CategoryType['type'] | null>(null);

  const [isOpenedCategoryInput, setIsOpenedCategoryInput] = useState<boolean>(false);

  const [searchParams] = useSearchParams();
  const categoryID = searchParams.get('categoryID');

  const isLoading = useAppSelector((state) => state.wallets.responseState.isLoading);

  if (isLoading !== false && categoryID === null) {
    return <CategoriesPagePlaceholder />;
  }

  if (categoryID !== null) return <CategoryEdit />;

  return (
    <>
      <PageContentWrapper style={{ margin: '0 auto' }} className="pb-0">
        <div className="d-flex justify-content-between flex-wrap-reverse">
          <div className="mb-2">
            <CategoriesFilter filter={filter} setFilter={setFilter} />
          </div>

          <ButtonWithIcon caption="Категории" onClick={() => setIsOpenedCategoryInput(true)} className="btn-body-primary mb-2">
            <PlusIcon iconSize="1.5rem" />
          </ButtonWithIcon>
        </div>

        <CategoriesList filter={filter} />
      </PageContentWrapper>

      <CategoryInput isOpened={isOpenedCategoryInput} setIsOpened={setIsOpenedCategoryInput} />
    </>
  );
};

import { FC } from 'react';
// Store
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from 'store/store.ts';
// Icons
import { EntityIcon, ListItemWrapper } from 'shared/ui';
import { CategoryTypeIcon } from 'pages/CategoriesPage/ui/CategoryTypeIcon.tsx';

interface CategoryItemProps {
  id: string;
  disabled?: boolean;
  loading?: boolean;
}

export const CategoryListItem: FC<CategoryItemProps> = ({ id, disabled, loading }) => {
  const category = useAppSelector((state) => state.categories.list[id]);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSetID = () => {
    searchParams.set('categoryID', id);
    setSearchParams(searchParams);
  };

  if (!category) {
    return null;
  }

  return (
    <ListItemWrapper onClick={handleSetID} disabled={disabled} loading={loading}>
      <div className="d-flex align-items-center">
        <EntityIcon iconName={category.iconName} iconBackgroundColor={category.color} iconSize="2.2rem" />
        <span className="mx-2 text-body" style={{ fontSize: '1.05rem' }}>
          {category.name}
        </span>
      </div>
      <CategoryTypeIcon type={category.type} />
    </ListItemWrapper>
  );
};

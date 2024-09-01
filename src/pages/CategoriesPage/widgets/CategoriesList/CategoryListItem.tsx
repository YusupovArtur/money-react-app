import { FC } from 'react';
// Store
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from 'store/store.ts';
// UI
import { ListItemLabel, ListItemWrapper } from 'shared/ui';
import { TransactionEntityTypeIcon } from 'entities/EntitiesComponents';
import { EntityIcon } from 'entities/EntityIcon';

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
      <EntityIcon iconName={category.iconName} color={category.color} iconSize="2.2rem" />

      <ListItemLabel className="flex-shrink-1 ms-2" style={{ marginRight: 'auto' }}>
        {category.name}
      </ListItemLabel>

      <TransactionEntityTypeIcon type={category.type} />
    </ListItemWrapper>
  );
};

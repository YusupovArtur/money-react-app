import { FC } from 'react';
// Store
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from 'store/store.ts';
// UI
import { ListItemFieldValue, ListItemWrapper } from 'shared/ui';
import { TransactionEntityTypeIcon } from 'entities/EntitiesComponents';
import { EntityIcon } from 'entities/EntityIcon';
import { selectCategory } from 'store/slices/categoriesSlice';

interface CategoryItemProps {
  id: string;
  disabled?: boolean;
  loading?: boolean;
}

export const CategoryListItem: FC<CategoryItemProps> = ({ id, disabled, loading }) => {
  const category = useAppSelector(selectCategory(id));
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

      <ListItemFieldValue className="flex-shrink-1 ms-2" style={{ marginRight: 'auto' }}>
        {category.name}
      </ListItemFieldValue>

      <TransactionEntityTypeIcon type={category.type} />
    </ListItemWrapper>
  );
};

import { FC } from 'react';
// Store
import { SubcategoryType } from 'store/slices/categoriesSlice';
import { useSearchParams } from 'react-router-dom';
// UI
import { ListItemLabel, ListItemWrapper } from 'shared/ui';
import { EntityIcon } from 'entities/EntityIcon';

interface SubcategoriesListItemProps {
  id: string;
  subcategory: SubcategoryType;
  disabled?: boolean;
  loading?: boolean;
  color: string;
}

export const SubcategoriesListItem: FC<SubcategoriesListItemProps> = ({ id, subcategory, disabled, loading, color }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSetID = () => {
    searchParams.set('subcategoryID', id);
    setSearchParams(searchParams);
  };

  return (
    <ListItemWrapper onClick={handleSetID} disabled={disabled} loading={loading}>
      <EntityIcon iconName={subcategory.iconName} iconSize="2.2rem" color={color}></EntityIcon>

      <ListItemLabel className="flex-shrink-1 ms-2" style={{ marginRight: 'auto' }}>
        {subcategory.name}
      </ListItemLabel>
    </ListItemWrapper>
  );
};

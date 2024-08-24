import { FC } from 'react';
// Store imports
import { SubcategoryType } from 'store/slices/categoriesSlice';
// Subcategory components_legacy
import { EntityIcon, ListItemWrapper } from 'shared/ui';
import { useSearchParams } from 'react-router-dom';

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
      <div className="d-flex align-items-center">
        <EntityIcon iconName={subcategory.iconName} iconSize="2.2rem" iconBackgroundColor={color}></EntityIcon>
        <span className="mx-2 text-body" style={{ fontSize: '1.05rem' }}>
          {subcategory.name}
        </span>
      </div>
    </ListItemWrapper>
  );
};

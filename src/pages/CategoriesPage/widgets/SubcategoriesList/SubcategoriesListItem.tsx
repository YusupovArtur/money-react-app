import { CSSProperties, FC } from 'react';
// Store imports
import { SubcategoryType } from 'store/slices/categoriesSlice';
// Subcategory components_legacy
import { EntityIcon } from 'shared/ui';
import { useSearchParams } from 'react-router-dom';

interface SubcategoriesListItemProps {
  subcategoryID: string;
  subcategory: SubcategoryType;
  color: string;
  style?: CSSProperties;
}

export const SubcategoriesListItem: FC<SubcategoriesListItemProps> = ({ subcategory, subcategoryID, color, style }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setID = () => {
    searchParams.set('subcategoryID', subcategoryID);
    setSearchParams(searchParams);
  };

  return (
    <div
      onClick={setID}
      style={style}
      className="hover-scale-1 d-flex justify-content-between align-items-center rounded shadow-sm px-3 py-2 mt-1"
    >
      <div className="d-flex align-items-center">
        <EntityIcon iconName={subcategory.iconName} iconSize="2.2rem" iconBackgroundColor={color}></EntityIcon>
        <span className="mx-2 text-body" style={{ fontSize: '1.05rem' }}>
          {subcategory.name}
        </span>
      </div>
    </div>
  );
};

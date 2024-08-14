import { CSSProperties, FC } from 'react';
// Store
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from 'store/store.ts';
// Icons
import { EntityIcon } from 'shared/ui';
import { CategoryTypeIcon } from 'pages/CategoriesPage/ui/CategoryTypeIcon.tsx';

interface CategoryItemProps {
  id: string;
  style?: CSSProperties;
}

export const CategoryListItem: FC<CategoryItemProps> = ({ id, style }) => {
  const category = useAppSelector((state) => state.categories.list[id]);
  const [searchParams, setSearchParams] = useSearchParams();

  const setID = () => {
    searchParams.set('categoryID', id);
    setSearchParams(searchParams);
  };

  if (!category) {
    return null;
  }

  return (
    <div
      onClick={setID}
      style={style}
      className="hover-scale-1 d-flex justify-content-between align-items-center rounded shadow-sm px-3 py-2 mt-1"
    >
      <div className="d-flex align-items-center">
        <EntityIcon iconName={category.iconName} iconBackgroundColor={category.color} iconSize="2.2rem" />
        <span className="mx-2 text-body" style={{ fontSize: '1.05rem' }}>
          {category.name}
        </span>
      </div>
      <CategoryTypeIcon type={category.type} />
    </div>
  );
};

import { FC } from 'react';
import { CategoryType } from 'store/slices/categoriesSlice';
import { ContentIcon } from 'shared/ui';
import { ArrowDownRightIconSVG, ArrowLeftRightIconSVG, ArrowUpRightIconSVG } from '../../../small_components/icons_svg/IconsSVG';

interface CategoryItemProps {
  id: string;
  category: CategoryType;
  setOpenedCategoryID: (id: string) => void;
}

export const CategoryItem: FC<CategoryItemProps> = ({ id, category, setOpenedCategoryID }) => {
  const typeIcon =
    category.type === 'expense' ? (
      <div style={{ color: '#dc3545' }}>
        <ArrowDownRightIconSVG iconSize="1.4rem" />
      </div>
    ) : category.type === 'income' ? (
      <div style={{ color: '#198754' }}>
        <ArrowUpRightIconSVG iconSize="1.4rem" />
      </div>
    ) : (
      <div style={{ color: '#0d6efd' }}>
        <ArrowLeftRightIconSVG iconSize="1.4rem" />
      </div>
    );

  const iconSize: number = 1.5;
  return (
    <div
      onClick={() => setOpenedCategoryID(id)}
      className="hover-scale-1 d-flex justify-content-between align-items-center rounded shadow-sm px-3 py-2 mt-2"
    >
      <div className="d-flex align-items-center">
        <div
          className="d-flex justify-content-center align-items-center rounded-circle"
          style={{ backgroundColor: category.color, width: `${1.415 * iconSize}rem`, height: `${1.415 * iconSize}rem` }}
        >
          <ContentIcon iconName={category.iconName} iconSize={`${iconSize}rem`} />
        </div>
        <span className="mx-2 text-body" style={{ fontSize: '1.05rem' }}>
          {category.name}
        </span>
      </div>
      {typeIcon}
    </div>
  );
};

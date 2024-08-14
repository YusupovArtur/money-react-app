import { FC } from 'react';
import { CategoryType } from 'store/slices/categoriesSlice';
import { ArrowDownRightIcon } from 'pages/CategoriesPage/ui/ArrowDownRightIcon.tsx';
import { ArrowUpRightIcon } from 'pages/CategoriesPage/ui/ArrowUpRightIcon.tsx';
import { ArrowLeftRightIcon } from 'components_legacy/small_components/icons_svg/IconsSVG.tsx';

export const CategoryTypeIcon: FC<{ type: CategoryType['type'] }> = ({ type }) => {
  switch (type) {
    case 'expense':
      return (
        <div style={{ color: '#dc3545' }}>
          <ArrowDownRightIcon iconSize="1.4rem" />
        </div>
      );
    case 'income':
      return (
        <div style={{ color: '#198754' }}>
          <ArrowUpRightIcon iconSize="1.4rem" />
        </div>
      );
    case 'transfer':
      return (
        <div style={{ color: '#0d6efd' }}>
          <ArrowLeftRightIcon iconSize="1.4rem" />
        </div>
      );
    default:
      return null;
  }
};

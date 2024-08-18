import { FC } from 'react';
import { EntityFieldLabel, EntityFieldValue, EntityIcon } from 'shared/ui';
import { getCategoryTypeName } from 'pages/CategoriesPage/helpers/getCategoryTypeName.ts';
import { CategoryType } from 'store/slices/categoriesSlice';
import { CategoryTypeIcon } from 'pages/CategoriesPage/ui/CategoryTypeIcon.tsx';

export const CategoryEditInfo: FC<{ category: CategoryType }> = ({ category }) => {
  return (
    <div className="d-flex flex-column mx-2 mb-4">
      {/*Type*/}
      <EntityFieldLabel className="mt-3">Тип категории</EntityFieldLabel>
      <div className="d-flex align-items-center">
        <CategoryTypeIcon type={category.type} />
        <EntityFieldValue className="ms-2">{getCategoryTypeName(category.type)}</EntityFieldValue>
      </div>

      {/*Name*/}
      <EntityFieldLabel className="mt-3">Имя категории</EntityFieldLabel>
      <EntityFieldValue>{category.name ? category.name : 'Нет имени'}</EntityFieldValue>

      {/*Icon*/}
      <EntityFieldLabel className="mt-3">Иконка</EntityFieldLabel>
      <EntityIcon iconName={category.iconName} iconSize="3.5rem" iconBackgroundColor={category.color} />

      {/*Description*/}
      {category.description && (
        <>
          <EntityFieldLabel className="mt-3">Описание</EntityFieldLabel>
          <EntityFieldValue>{category.description ? category.description : 'Нет описания'}</EntityFieldValue>
        </>
      )}
    </div>
  );
};

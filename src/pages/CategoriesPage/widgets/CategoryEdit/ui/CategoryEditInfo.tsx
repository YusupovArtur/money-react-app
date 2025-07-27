import { FC } from 'react';
import { EntityFieldLabel, EntityFieldValue } from 'shared/ui';
import { CategoryType } from 'store/slices/categoriesSlice';
import { EntityIcon } from 'entities/EntityIcon';
import { getTypeCaption, TypeIcon } from 'entities/EntitiesComponents';

export const CategoryEditInfo: FC<{ category: CategoryType }> = ({ category }) => {
  return (
    <div className="d-flex flex-column mx-2 mb-4">
      {/*Type*/}
      <EntityFieldLabel className="mt-3">Тип категории</EntityFieldLabel>
      <div className="d-flex align-items-center">
        <TypeIcon type={category.type} />
        <EntityFieldValue className="ms-2">{getTypeCaption(category.type)}</EntityFieldValue>
      </div>

      {/*Name*/}
      <EntityFieldLabel className="mt-3">Имя категории</EntityFieldLabel>
      <EntityFieldValue>{category.name ? category.name : 'Нет имени'}</EntityFieldValue>

      {/*Icon*/}
      <EntityFieldLabel className="mt-3">Иконка</EntityFieldLabel>
      <EntityIcon iconName={category.iconName} iconSize="3.5rem" color={category.color} />

      {/*Description*/}
      {category.description && (
        <>
          <EntityFieldLabel className="mt-3">Описание</EntityFieldLabel>
          <EntityFieldValue>{category.description}</EntityFieldValue>
        </>
      )}
    </div>
  );
};

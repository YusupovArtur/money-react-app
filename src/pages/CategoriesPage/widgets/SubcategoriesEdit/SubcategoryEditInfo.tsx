import { FC } from 'react';
import { EntityFieldLabel, EntityFieldValue } from 'shared/ui';
import { SubcategoryType } from 'store/slices/categoriesSlice';
import { EntityIcon } from 'entities/EntityIcon';

interface SubcategoryEditInfoProps {
  subcategory: SubcategoryType;
  color: string;
}

export const SubcategoryEditInfo: FC<SubcategoryEditInfoProps> = ({ subcategory, color }) => {
  return (
    <div className="d-flex flex-column mx-2 mb-4">
      {/* Имя подкатегории */}
      <EntityFieldLabel>Имя подкатегории</EntityFieldLabel>
      <EntityFieldValue>{subcategory.name ? subcategory.name : 'Нет имени'}</EntityFieldValue>

      {/* Иконка подкатегории */}
      <EntityFieldLabel className="mt-3">Иконка</EntityFieldLabel>
      <EntityIcon iconName={subcategory.iconName} iconSize="3.5rem" color={color} />

      {/* Описание подкатегории */}
      {subcategory.description && (
        <>
          <EntityFieldLabel className="mt-3">Описание</EntityFieldLabel>
          <EntityFieldValue>{subcategory.description}</EntityFieldValue>
        </>
      )}
    </div>
  );
};

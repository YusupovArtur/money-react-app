import { FC } from 'react';
import { ContentIcon } from 'shared/ui';
import { SubcategoryType } from 'store/slices/categoriesSlice';

export const SubcategoryOpenedInfo: FC<{ subcategory: SubcategoryType; color: string }> = ({ subcategory, color }) => {
  const iconSize: number = 2.5;

  return (
    <div className="d-flex flex-column">
      {/* Имя подкатегории */}
      <span className="text-body-tertiary mt-2">Имя подкатегории</span>
      <span className="text-body my-1" style={{ fontSize: '1.08rem', fontWeight: 500 }}>
        {subcategory.name}
      </span>

      {/* Иконка подкатегории */}
      <span className="text-body-tertiary mt-2">Иконка</span>
      <div className="d-flex justify-content-start align-items-center">
        <div
          className="d-flex justify-content-center align-items-center rounded-circle"
          style={{ backgroundColor: color, width: `${1.415 * iconSize}rem`, height: `${1.415 * iconSize}rem` }}
        >
          <ContentIcon iconName={subcategory.iconName} iconSize={`${iconSize}rem`} />
        </div>
      </div>

      {/* Описание подкатегории */}
      <span className="text-body-tertiary mt-2">Описание</span>
      <span className="text-body my-1" style={{ fontSize: '1.08rem' }}>
        {subcategory.description ? subcategory.description : 'Нет описания'}
      </span>
    </div>
  );
};

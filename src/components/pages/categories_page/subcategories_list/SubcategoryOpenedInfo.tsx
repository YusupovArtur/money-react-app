import React from 'react';
import ContentIcon from 'components/small_components/icons_svg/icon_sets/ContentIconSets';
import { subcategoryType } from 'store/types';

const SubcategoryOpenedInfo: React.FC<{ subcategory: subcategoryType; color: string }> = ({ subcategory, color }) => {
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
          <ContentIcon iconName={subcategory.iconName} iconSize={`${iconSize}rem`}></ContentIcon>
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

export default SubcategoryOpenedInfo;

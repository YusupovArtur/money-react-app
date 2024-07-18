import { FC } from 'react';
import ContentIcon from '../../../small_components/icons_svg/icon_sets/ContentIconSets';
import { getCategoryTypeName } from '../../../pages/categories_page/functions';
import { categoryType } from 'store/types';

const CategoryOpenedInfo: FC<{ category: categoryType }> = ({ category }) => {
  const iconSize: number = 2.5;

  return (
    <div className="d-flex flex-column">
      <span className="text-body-tertiary mt-2">Имя категории</span>
      <span className="text-body my-1" style={{ fontSize: '1.08rem', fontWeight: 500 }}>
        {category.name}
      </span>
      <span className="text-body-tertiary mt-2">Иконка</span>
      <div className="d-flex justify-content-start align-items-center">
        <div
          className="d-flex justify-content-center align-items-center rounded-circle"
          style={{ backgroundColor: category.color, width: `${1.415 * iconSize}rem`, height: `${1.415 * iconSize}rem` }}
        >
          <ContentIcon iconName={category.iconName} iconSize={`${iconSize}rem`}></ContentIcon>
        </div>
      </div>
      <span className="text-body-tertiary mt-2">Тип категории</span>
      <span className="text-body my-1" style={{ fontSize: '1.08rem', fontWeight: 500 }}>
        {getCategoryTypeName(category.type)}
      </span>
      <span className="text-body-tertiary mt-2">Описание</span>
      <span className="text-body my-1" style={{ fontSize: '1.08rem' }}>
        {category.description ? category.description : 'Нет описания'}
      </span>
    </div>
  );
};

export default CategoryOpenedInfo;

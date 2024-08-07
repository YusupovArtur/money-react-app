import { FC } from 'react';
import { ContentIcon } from 'shared/ui';
import { getCategoryTypeName } from '../../../pages/categories_page/functions';
import { CategoryType } from 'store/slices/categoriesSlice';

export const CategoryOpenedInfo: FC<{ category: CategoryType }> = ({ category }) => {
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
          <ContentIcon iconName={category.iconName} iconSize={`${iconSize}rem`} />
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

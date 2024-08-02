import { Dispatch, FC, SetStateAction } from 'react';
import { categoryType } from 'store/types';
import { ContentIcon } from 'shared/ui';
import { ArrowDownRightIconSVG, ArrowLeftRightIconSVG, ArrowUpRightIconSVG } from '../../../small_components/icons_svg/IconsSVG';

export const CategoryItem: FC<{
  category: categoryType;
  setOpenedCategory: Dispatch<SetStateAction<{ category: categoryType; isOpened: boolean }>>;
}> = ({ category, setOpenedCategory }) => {
  const typeIcon =
    category.type === 'expense' ? (
      <div id={category.id} style={{ color: '#dc3545' }}>
        <ArrowDownRightIconSVG iconSize="1.4rem" />
      </div>
    ) : category.type === 'income' ? (
      <div id={category.id} style={{ color: '#198754' }}>
        <ArrowUpRightIconSVG iconSize="1.4rem" />
      </div>
    ) : (
      <div id={category.id} style={{ color: '#0d6efd' }}>
        <ArrowLeftRightIconSVG iconSize="1.4rem" />
      </div>
    );

  const iconSize: number = 1.5;
  return (
    <div
      id={category.id}
      onClick={() => setOpenedCategory({ isOpened: true, category })}
      className="hover-scale-1 d-flex justify-content-between align-items-center rounded shadow-sm px-3 py-2 mt-2"
    >
      <div id={category.id} className="d-flex align-items-center">
        <div
          id={category.id}
          className="d-flex justify-content-center align-items-center rounded-circle"
          style={{ backgroundColor: category.color, width: `${1.415 * iconSize}rem`, height: `${1.415 * iconSize}rem` }}
        >
          <ContentIcon iconName={category.iconName} iconSize={`${iconSize}rem`} />
        </div>
        <span id={category.id} className="mx-2 text-body" style={{ fontSize: '1.05rem' }}>
          {category.name}
        </span>
      </div>
      {typeIcon}
    </div>
  );
};

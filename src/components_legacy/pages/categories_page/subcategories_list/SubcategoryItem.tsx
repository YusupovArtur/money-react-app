import React, { useState } from 'react';
// Store imports
import { subcategoryType } from 'store/types';
// Subcategory components_legacy
import SubcategoryOpened from '../../../pages/categories_page/subcategories_list/SubcategoryOpened';
import ContentIcon from '../../../small_components/icons_svg/icon_sets/ContentIconSets';

const SubcategoryItem: FC<{
  subcategory: subcategoryType;
  categoryID: string;
  color: string;
}> = ({ subcategory, categoryID, color }) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const iconSize: number = 1.5;
  return (
    <>
      <div
        id={subcategory.id}
        onClick={() => setIsOpened(true)}
        className="hover-scale-1 d-flex justify-content-between align-items-center rounded shadow-sm px-3 py-2 mt-2"
      >
        <div id={subcategory.id} className="d-flex align-items-center">
          <div
            id={subcategory.id}
            className="d-flex justify-content-center align-items-center rounded-circle"
            style={{ backgroundColor: color, width: `${1.415 * iconSize}rem`, height: `${1.415 * iconSize}rem` }}
          >
            <ContentIcon iconName={subcategory.iconName} iconSize={`${iconSize}rem`}></ContentIcon>
          </div>
          <span id={subcategory.id} className="mx-2 text-body" style={{ fontSize: '1.05rem' }}>
            {subcategory.name}
          </span>
        </div>
      </div>

      <SubcategoryOpened
        subcategory={subcategory}
        categoryID={categoryID}
        color={color}
        isOpened={isOpened}
        setIsOpened={setIsOpened}
      ></SubcategoryOpened>
    </>
  );
};

export default SubcategoryItem;

import { FC, useState } from 'react';
// Store imports
import { SubcategoryType } from 'store/slices/categoriesSlice';
// Subcategory components_legacy
import { SubcategoryOpened } from '../../../pages/categories_page/subcategories_list/SubcategoryOpened';
import { ContentIcon } from 'shared/ui';

export const SubcategoryItem: FC<{
  categoryID: string;
  subcategoryID: string;
  subcategory: SubcategoryType;
  color: string;
}> = ({ subcategory, categoryID, subcategoryID, color }) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const iconSize: number = 1.5;
  return (
    <>
      <div
        onClick={() => setIsOpened(true)}
        className="hover-scale-1 d-flex justify-content-between align-items-center rounded shadow-sm px-3 py-2 mt-2"
      >
        <div className="d-flex align-items-center">
          <div
            className="d-flex justify-content-center align-items-center rounded-circle"
            style={{ backgroundColor: color, width: `${1.415 * iconSize}rem`, height: `${1.415 * iconSize}rem` }}
          >
            <ContentIcon iconName={subcategory.iconName} iconSize={`${iconSize}rem`} />
          </div>
          <span className="mx-2 text-body" style={{ fontSize: '1.05rem' }}>
            {subcategory.name}
          </span>
        </div>
      </div>

      <SubcategoryOpened
        categoryID={categoryID}
        subcategoryID={subcategoryID}
        subcategory={subcategory}
        color={color}
        isOpened={isOpened}
        setIsOpened={setIsOpened}
      />
    </>
  );
};

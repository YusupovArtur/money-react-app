import { FC, useState } from 'react';
// Store imports
import { useAppDispatch, useAppSelector } from 'store';
import { CATEGORIES_LIST_LAST_ITEM_ID, shiftCategory } from 'store/slices/categoriesSlice';
// Category imports
import { CategoryItem } from '../../../pages/categories_page/categories_list/CategoryItem';
import { DraggableContainer } from 'shared/containers';

interface CategoriesListProps {
  categoriesOrder: string[];
  setOpenedCategoryID: (id: string) => void;
}

export const CategoriesList: FC<CategoriesListProps> = ({ categoriesOrder, setOpenedCategoryID }) => {
  const categories = useAppSelector((state) => state.categories.list);

  const [dragOverID, setDragOverID] = useState<string>('');
  const [dragStartID, setDragStartID] = useState<string>('');

  const dispatch = useAppDispatch();
  const dropFunction = (dropID: string) => dispatch(shiftCategory({ categoryID1: dragStartID, categoryID2: dropID }));

  return (
    <div>
      {categoriesOrder.map((id, index) => (
        <DraggableContainer
          key={id}
          draggable={true}
          onDrop={dropFunction}
          id={id}
          aboveID={index === 0 ? 'no-above-item' : id[index - 1]}
          startID={dragStartID}
          setStartID={setDragStartID}
          overID={dragOverID}
          setOverID={setDragOverID}
        >
          <CategoryItem id={id} category={categories[id]} setOpenedCategoryID={setOpenedCategoryID} />
        </DraggableContainer>
      ))}

      <DraggableContainer
        draggable={false}
        onDrop={dropFunction}
        id={CATEGORIES_LIST_LAST_ITEM_ID}
        aboveID={categoriesOrder[categoriesOrder.length - 1] ? categoriesOrder[categoriesOrder.length - 1] : ''}
        startID={dragStartID}
        setStartID={setDragStartID}
        overID={dragOverID}
        setOverID={setDragOverID}
      />
    </div>
  );
};

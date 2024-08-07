import { FC, useState } from 'react';
// Store imports
import { useAppDispatch, useAppSelector } from 'store';
import { CATEGORIES_LIST_LAST_ITEM_ID, shiftCategory } from 'store/slices/categoriesSlice';
// Category imports
import { CategoryItem } from '../../../pages/categories_page/categories_list/CategoryItem';
import DraggableItem from '../../../small_components/dragable/DraggableItem';

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
        <DraggableItem
          key={id}
          isDraggable={true}
          onDrop={dropFunction}
          itemID={id}
          itemIDAbove={index === 0 ? 'no-above-item' : id[index - 1]}
          dragStartID={dragStartID}
          setDragStartID={setDragStartID}
          dragOverID={dragOverID}
          setDragOverID={setDragOverID}
        >
          <CategoryItem id={id} category={categories[id]} setOpenedCategoryID={setOpenedCategoryID} />
        </DraggableItem>
      ))}

      <DraggableItem
        isDraggable={false}
        onDrop={dropFunction}
        itemID={CATEGORIES_LIST_LAST_ITEM_ID}
        itemIDAbove={categoriesOrder[categoriesOrder.length - 1] ? categoriesOrder[categoriesOrder.length - 1] : ''}
        dragStartID={dragStartID}
        setDragStartID={setDragStartID}
        dragOverID={dragOverID}
        setDragOverID={setDragOverID}
      />
    </div>
  );
};

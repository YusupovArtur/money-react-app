import React, { useState } from 'react';
// Store imports
import { useAppDispatch } from 'store/hook';
import { shiftCategory } from 'store/slices/categoriesSlice';
import { CATEGORIES_LIST_LAST_ITEM_ID, categoryType } from 'store/types';
// Category imports
import CategoryItem from 'components/pages/categories_page/categories_list/CategoryItem';
import DragableItem from 'components/small_components/dragable/DragableItem';

const CategoriesList: React.FC<{
  categories: categoryType[];
  setOpenedCategory: React.Dispatch<React.SetStateAction<{ category: categoryType; isOpened: boolean }>>;
}> = ({ categories, setOpenedCategory }) => {
  if (categories.length === 0) return null;

  const [dragOverID, setDragOverID] = useState<string>('');
  const [dragStartID, setDragStartID] = useState<string>('');

  const dispatch = useAppDispatch();
  const dropFunction = (dropID: string) => dispatch(shiftCategory({ categoryID: dragStartID, newIndexID: dropID }));

  return (
    <div>
      {categories.map((category, index) => (
        <DragableItem
          key={category.id}
          isDraggable={true}
          dropFunction={dropFunction}
          itemID={category.id}
          itemIDAbove={index === 0 ? 'no-above-item' : categories[index - 1].id}
          dragStartID={dragStartID}
          setDragStartID={setDragStartID}
          dragOverID={dragOverID}
          setDragOverID={setDragOverID}
        >
          <CategoryItem category={category} setOpenedCategory={setOpenedCategory}></CategoryItem>
        </DragableItem>
      ))}

      <DragableItem
        isDraggable={false}
        dropFunction={dropFunction}
        itemID={CATEGORIES_LIST_LAST_ITEM_ID}
        itemIDAbove={categories[categories.length - 1] ? categories[categories.length - 1].id : ''}
        dragStartID={dragStartID}
        setDragStartID={setDragStartID}
        dragOverID={dragOverID}
        setDragOverID={setDragOverID}
      ></DragableItem>
    </div>
  );
};

export default CategoriesList;

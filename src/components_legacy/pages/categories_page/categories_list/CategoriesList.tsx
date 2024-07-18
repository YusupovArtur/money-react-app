import { useState, FC, Dispatch, SetStateAction } from 'react';
// Store imports
import { useAppDispatch } from 'store/hook';
import { shiftCategory } from 'store/slices/categoriesSlice';
import { CATEGORIES_LIST_LAST_ITEM_ID, categoryType } from 'store/types';
// Category imports
import CategoryItem from '../../../pages/categories_page/categories_list/CategoryItem';
import DraggableItem from '../../../small_components/dragable/DraggableItem.tsx';

const CategoriesList: FC<{
  categories: categoryType[];
  setOpenedCategory: Dispatch<SetStateAction<{ category: categoryType; isOpened: boolean }>>;
}> = ({ categories, setOpenedCategory }) => {
  if (categories.length === 0) return null;

  const [dragOverID, setDragOverID] = useState<string>('');
  const [dragStartID, setDragStartID] = useState<string>('');

  const dispatch = useAppDispatch();
  const dropFunction = (dropID: string) => dispatch(shiftCategory({ categoryID: dragStartID, newIndexID: dropID }));

  return (
    <div>
      {categories.map((category, index) => (
        <DraggableItem
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
        </DraggableItem>
      ))}

      <DraggableItem
        isDraggable={false}
        dropFunction={dropFunction}
        itemID={CATEGORIES_LIST_LAST_ITEM_ID}
        itemIDAbove={categories[categories.length - 1] ? categories[categories.length - 1].id : ''}
        dragStartID={dragStartID}
        setDragStartID={setDragStartID}
        dragOverID={dragOverID}
        setDragOverID={setDragOverID}
      ></DraggableItem>
    </div>
  );
};

export default CategoriesList;
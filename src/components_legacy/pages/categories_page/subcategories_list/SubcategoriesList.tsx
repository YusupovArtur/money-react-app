import { FC, useState } from 'react';
// Store imports
import { useAppDispatch } from 'store';
import { CategoryType, shiftSubCategory, SUBCATEGORIES_LIST_LAST_ITEM_ID } from 'store/slices/categoriesSlice';
// Subcategories imports
import { SubcategoryItem } from '../../../pages/categories_page/subcategories_list/SubcategoryItem';
import DraggableItem from '../../../small_components/dragable/DraggableItem';

export const SubcategoriesList: FC<{
  categoryID: string;
  category: CategoryType;
}> = ({ categoryID, category }) => {
  const [dragOverID, setDragOverID] = useState<string>('');
  const [dragStartID, setDragStartID] = useState<string>('');

  const dispatch = useAppDispatch();
  const dropFunction = (dropID: string) => {
    dispatch(shiftSubCategory({ categoryID: categoryID, subcategoryID1: dragStartID, subcategoryID2: dropID }));
  };

  return (
    <>
      {category.subcategories.order.map((id, index) => (
        <DraggableItem
          key={id}
          onDrop={dropFunction}
          isDraggable={true}
          dragStartID={dragStartID}
          setDragStartID={setDragStartID}
          dragOverID={dragOverID}
          setDragOverID={setDragOverID}
          itemID={id}
          itemIDAbove={index === 0 ? 'no-above-item' : category.subcategories.order[index - 1]}
        >
          <SubcategoryItem
            subcategory={category.subcategories.list[id]}
            subcategoryID={id}
            categoryID={categoryID}
            color={category.color}
          />
        </DraggableItem>
      ))}

      <DraggableItem
        onDrop={dropFunction}
        isDraggable={false}
        dragStartID={dragStartID}
        setDragStartID={setDragStartID}
        dragOverID={dragOverID}
        setDragOverID={setDragOverID}
        itemID={SUBCATEGORIES_LIST_LAST_ITEM_ID}
        itemIDAbove={
          category.subcategories.order[category.subcategories.order.length - 1]
            ? category.subcategories.order[category.subcategories.order.length - 1]
            : ''
        }
      />
    </>
  );
};

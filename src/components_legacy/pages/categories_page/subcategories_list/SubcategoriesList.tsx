import { FC, useState } from 'react';
// Store imports
import { useAppDispatch } from 'store/hook';
import { shiftSubCategory } from 'store/slices/categoriesSlice';
import { categoryType, SUBCATEGORIES_LIST_LAST_ITEM_ID } from 'store/types';
// Subcategories imports
import SubcategoryItem from '../../../pages/categories_page/subcategories_list/SubcategoryItem';
import DraggableItem from '../../../small_components/dragable/DraggableItem';

const SubcategoriesList: FC<{
  category: categoryType;
}> = ({ category }) => {
  const [dragOverID, setDragOverID] = useState<string>('');
  const [dragStartID, setDragStartID] = useState<string>('');

  const dispatch = useAppDispatch();
  const dropFunction = (dropID: string) => {
    dispatch(shiftSubCategory({ categoryID: category.id, subcategoryID: dragStartID, newIndexID: dropID }));
  };

  return (
    <>
      {category.subcategories.map((subcategory, index) => (
        <DraggableItem
          key={subcategory.id}
          onDrop={dropFunction}
          isDraggable={true}
          dragStartID={dragStartID}
          setDragStartID={setDragStartID}
          dragOverID={dragOverID}
          setDragOverID={setDragOverID}
          itemID={subcategory.id}
          itemIDAbove={index === 0 ? 'no-above-item' : category.subcategories[index - 1].id}
        >
          <SubcategoryItem subcategory={subcategory} categoryID={category.id} color={category.color} />
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
          category.subcategories[category.subcategories.length - 1]
            ? category.subcategories[category.subcategories.length - 1].id
            : ''
        }
      />
    </>
  );
};

export default SubcategoriesList;

import { FC, useState } from 'react';
// Store imports
import { useAppDispatch } from 'store/index.ts';
import { CategoryType, shiftSubCategory, SUBCATEGORIES_LIST_LAST_ITEM_ID } from 'store/slices/categoriesSlice';
// Subcategories imports
import { SubcategoriesListItem } from 'pages/CategoriesPage/widgets/SubcategoriesList/SubcategoriesListItem.tsx';
import { DraggableContainer } from 'shared/containers';

export const SubcategoriesList: FC<{
  categoryID: string;
  category: CategoryType;
}> = ({ categoryID, category }) => {
  const order = category.subcategories.order;
  const list = category.subcategories.list;

  const [dragOverID, setDragOverID] = useState<string>('');
  const [dragStartID, setDragStartID] = useState<string>('');

  const dispatch = useAppDispatch();
  const dropFunction = (dropID: string) => {
    dispatch(shiftSubCategory({ categoryID: categoryID, subcategoryID1: dragStartID, subcategoryID2: dropID }));
  };

  return (
    <>
      <label className="form-label text-body user-select-none mb-1">Подкатегории</label>

      {order.map((id, index) => {
        const aboveID = index === 0 ? undefined : order[index - 1];
        const isOpened = id === dragOverID && id !== dragStartID && aboveID !== dragStartID;
        return (
          <DraggableContainer
            key={id}
            id={id}
            draggable={true}
            isOpened={isOpened}
            onDrop={dropFunction}
            startID={dragStartID}
            setStartID={setDragStartID}
            setOverID={setDragOverID}
          >
            <SubcategoriesListItem subcategory={list[id]} subcategoryID={id} color={category.color} />
          </DraggableContainer>
        );
      })}

      <DraggableContainer
        id={SUBCATEGORIES_LIST_LAST_ITEM_ID}
        draggable={false}
        onDrop={dropFunction}
        isOpened={
          SUBCATEGORIES_LIST_LAST_ITEM_ID === dragOverID &&
          SUBCATEGORIES_LIST_LAST_ITEM_ID !== dragStartID &&
          (order[order.length - 1] ? order[order.length - 1] : undefined) !== dragStartID
        }
        startID={dragStartID}
        setStartID={setDragStartID}
        setOverID={setDragOverID}
      >
        <div className="mb-3"></div>
      </DraggableContainer>
    </>
  );
};

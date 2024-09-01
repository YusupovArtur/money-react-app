import { FC, useState } from 'react';
// Store
import { useAppDispatch } from 'store/index.ts';
import { CategoryType, shiftSubCategory, SUBCATEGORIES_LIST_LAST_ITEM_ID } from 'store/slices/categoriesSlice';
// Subcategories
import { SubcategoriesListItem } from 'pages/CategoriesPage/widgets/SubcategoriesList/SubcategoriesListItem.tsx';
import { DraggableContainer } from 'shared/containers';
import { AlertMessage, EntityFieldLabel } from 'shared/ui';
import { getDeviceType } from 'shared/helpers';

interface SubcategoriesListProps {
  categoryID: string;
  category: CategoryType;
}

export const SubcategoriesList: FC<SubcategoriesListProps> = ({ categoryID, category }) => {
  const order = category.subcategories.order;
  const list = category.subcategories.list;

  const [dragOverID, setDragOverID] = useState<string>('');
  const [dragStartID, setDragStartID] = useState<string>('');

  const draggable = getDeviceType() === 'desktop';
  const [shiftIsLoading, setShiftIsLoading] = useState<boolean>(false);
  const [shiftErrorMessage, setShiftErrorMessage] = useState<string>('');

  const dispatch = useAppDispatch();
  const dropFunction = (dropID: string) => {
    dispatch(
      shiftSubCategory({
        categoryID: categoryID,
        subcategoryID1: dragStartID,
        subcategoryID2: dropID,
        setIsLoading: setShiftIsLoading,
        setErrorMessage: setShiftErrorMessage,
      }),
    );
  };

  return (
    <>
      <EntityFieldLabel>Подкатегории</EntityFieldLabel>

      <AlertMessage alertMessage={shiftErrorMessage} className="alert-danger mt-1" />

      {order.map((id, index) => {
        const aboveID = index === 0 ? undefined : order[index - 1];
        const isOpened = id === dragOverID && id !== dragStartID && aboveID !== dragStartID;
        const disabled = shiftIsLoading || (Boolean(dragStartID) && id !== dragStartID);

        return (
          <DraggableContainer
            key={id}
            id={id}
            draggable={draggable && !shiftIsLoading}
            isOpened={isOpened}
            onDrop={dropFunction}
            startID={dragStartID}
            setStartID={setDragStartID}
            setOverID={setDragOverID}
          >
            <SubcategoriesListItem
              id={id}
              subcategory={list[id]}
              disabled={disabled}
              loading={shiftIsLoading}
              color={category.color}
            />
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

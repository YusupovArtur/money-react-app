import { FC, useDeferredValue, useState } from 'react';
// Store imports
import { useAppDispatch, useAppSelector } from 'store/index.ts';
import { CATEGORIES_LIST_LAST_ITEM_ID, CategoryType, shiftCategory } from 'store/slices/categoriesSlice';
// Category imports
import { CategoryListItem } from 'pages/CategoriesPage/widgets/CategoriesList/CategoryListItem.tsx';
import { DraggableContainer } from 'shared/containers';
import { AlertMessage } from 'shared/ui';

interface CategoriesListProps {
  filter?: CategoryType['type'] | null;
}

export const CategoriesList: FC<CategoriesListProps> = ({ filter }) => {
  const deferredFilter = useDeferredValue(filter);
  const categories = useAppSelector((state) => state.categories.list);
  const order = useAppSelector((state) => state.categories.order).filter((id) =>
    !deferredFilter ? true : deferredFilter === categories[id].type,
  );

  const errorMessage = useAppSelector((state) => state.categories.responseState.errorMessage);
  const [shiftIsLoading, setShiftIsLoading] = useState<boolean>(false);
  const [shiftErrorMessage, setShiftErrorMessage] = useState<string>('');

  const [dragOverID, setDragOverID] = useState<string>('');
  const [dragStartID, setDragStartID] = useState<string>('');

  const dispatch = useAppDispatch();
  const dropFunction = (dropID: string) =>
    dispatch(
      shiftCategory({
        categoryID1: dragStartID,
        categoryID2: dropID,
        setIsLoading: setShiftIsLoading,
        setErrorMessage: setShiftErrorMessage,
      }),
    );

  if (errorMessage) {
    return <AlertMessage alertMessage={errorMessage} className="alert-danger my-3" />;
  }

  return (
    <>
      <AlertMessage alertMessage={shiftErrorMessage} className="alert-danger mt-1" />

      {order.map((id, index) => {
        const aboveID = index === 0 ? undefined : order[index - 1];
        const isOpened = id === dragOverID && id !== dragStartID && aboveID !== dragStartID;
        const disabled = shiftIsLoading || (Boolean(dragStartID) && id !== dragStartID);

        return (
          <DraggableContainer
            key={id}
            id={id}
            draggable={!shiftIsLoading}
            isOpened={isOpened}
            onDrop={dropFunction}
            startID={dragStartID}
            setStartID={setDragStartID}
            setOverID={setDragOverID}
          >
            <CategoryListItem id={id} disabled={disabled} loading={shiftIsLoading} />
          </DraggableContainer>
        );
      })}

      <DraggableContainer
        id={CATEGORIES_LIST_LAST_ITEM_ID}
        draggable={false}
        isOpened={
          CATEGORIES_LIST_LAST_ITEM_ID === dragOverID &&
          CATEGORIES_LIST_LAST_ITEM_ID !== dragStartID &&
          (order[order.length - 1] ? order[order.length - 1] : undefined) !== dragStartID
        }
        onDrop={dropFunction}
        startID={dragStartID}
        setStartID={setDragStartID}
        setOverID={setDragOverID}
      >
        <div className="mb-3"></div>
      </DraggableContainer>
    </>
  );
};

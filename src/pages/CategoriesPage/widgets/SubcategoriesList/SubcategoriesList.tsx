import { FC, useState } from 'react';
// Store
import { useAppDispatch } from 'store/index.ts';
import { CategoryType, shiftSubCategory } from 'store/slices/categoriesSlice';
// Subcategories
import { SubcategoriesListItem } from 'pages/CategoriesPage/widgets/SubcategoriesList/SubcategoriesListItem.tsx';
import { DraggableContainer } from 'shared/containers';
import { AlertMessage, EntityFieldLabel } from 'shared/ui';
import { getOpenableContainersState } from 'shared/containers/DraggableContainer/helpers/getOpenableContainersState.ts';

interface SubcategoriesListProps {
  categoryID: string;
  category: CategoryType;
}

export const SubcategoriesList: FC<SubcategoriesListProps> = ({ categoryID, category }) => {
  const order = category.subcategories.order;
  const list = category.subcategories.list;

  const [dragOverIndex, setDragOverIndex] = useState<number>(NaN);
  const [dragStartIndex, setDragStartIndex] = useState<number>(NaN);

  const [shiftIsLoading, setShiftIsLoading] = useState<boolean>(false);
  const [shiftErrorMessage, setShiftErrorMessage] = useState<string>('');

  const dispatch = useAppDispatch();
  const dropFunction = (index: number) => {
    dispatch(
      shiftSubCategory({
        categoryID: categoryID,
        index1: dragStartIndex,
        index2: index,
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
        const disabled = shiftIsLoading || (Boolean(dragStartIndex) && index !== dragStartIndex);

        return (
          <DraggableContainer
            key={id}
            index={index}
            draggable={!shiftIsLoading}
            isOpened={getOpenableContainersState({
              index: index,
              startIndex: dragStartIndex,
              overIndex: dragOverIndex,
              length: order.length,
            })}
            onDrop={dropFunction}
            startIndex={dragStartIndex}
            setStartIndex={setDragStartIndex}
            setOverIndex={setDragOverIndex}
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
    </>
  );
};

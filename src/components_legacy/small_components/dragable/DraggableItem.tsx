import { Dispatch, DragEvent, FC, ReactNode, SetStateAction } from 'react';
import useDragEnter from '../../small_components/dragable/useDragEnter';

interface DraggableItemProps {
  children?: ReactNode;
  isDraggable: boolean;
  dropFunction: (dropID: string) => void;
  dragStartID: string;
  setDragStartID: Dispatch<SetStateAction<string>>;
  dragOverID: string;
  setDragOverID: Dispatch<SetStateAction<string>>;
  itemID: string;
  itemIDAbove: string;
}

const DraggableItem: FC<DraggableItemProps> = ({
  children,
  isDraggable,
  dropFunction,
  dragStartID,
  setDragStartID,
  dragOverID,
  setDragOverID,
  itemID,
  itemIDAbove,
}) => {
  const dragClassName = useDragEnter({
    dragStartID,
    dragOverID,
    itemID,
    itemIDAbove,
    openClassName: 'move-open-animation-28',
    closeClassName: 'move-close-animation-28',
  });

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    const targetElement = event.target as HTMLDivElement;
    if (targetElement.id && dragOverID !== targetElement.id) setDragOverID(targetElement.id);
  };

  const handleDrop = () => {
    dropFunction(itemID);
    setDragStartID('');
    setDragOverID('');
  };

  return (
    <div
      id={itemID}
      draggable={isDraggable}
      onDragStart={() => setDragStartID(itemID)}
      onDragEnter={(event) => handleDragOver(event)}
      onDragEnd={() => {
        setDragStartID('');
        setDragOverID('');
      }}
      onDrop={() => handleDrop()}
      className={isDraggable ? '' : 'pb-3'}
    >
      <div id={itemID} className={dragClassName}></div>
      {children}
    </div>
  );
};

export default DraggableItem;

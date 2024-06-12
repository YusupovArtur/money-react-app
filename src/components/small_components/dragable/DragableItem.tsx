import React, { ReactNode } from 'react';
import useDragEnter from 'components/small_components/dragable/useDragEnter';

interface DragableItemProps {
  children?: ReactNode;
  isDraggable: boolean;
  dropFunction: (dropID: string) => void;
  dragStartID: string;
  setDragStartID: React.Dispatch<React.SetStateAction<string>>;
  dragOverID: string;
  setDragOverID: React.Dispatch<React.SetStateAction<string>>;
  itemID: string;
  itemIDAbove: string;
}

const DragableItem: React.FC<DragableItemProps> = ({
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
    dragStartID: dragStartID,
    dragOverID: dragOverID,
    itemID: itemID,
    itemIDAbove: itemIDAbove,
    openClassName: 'move-open-animation-28',
    closeClassName: 'move-close-animation-28',
  });

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
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

export default DragableItem;

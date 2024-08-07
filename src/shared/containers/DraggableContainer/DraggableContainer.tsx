import { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import useDragEnter from 'shared/containers/DraggableContainer/useDragEnter.ts';

interface DraggableItemProps {
  children?: ReactNode;
  isDraggable: boolean;
  onDrop: (dropID: string) => void;
  dragStartID: string;
  setDragStartID: Dispatch<SetStateAction<string>>;
  dragOverID: string;
  setDragOverID: Dispatch<SetStateAction<string>>;
  id: string;
  itemIDAbove: string;
}

export const DraggableContainer: FC<DraggableItemProps> = ({
  id,
  children,
  isDraggable,
  onDrop,
  dragStartID,
  setDragStartID,
  dragOverID,
  setDragOverID,
  itemIDAbove,
}) => {
  const dragClassName = useDragEnter({
    id,
    dragStartID,
    dragOverID,
    itemIDAbove,
    openClassName: 'move-open-animation-28',
    closeClassName: 'move-close-animation-28',
  });

  const handleDrop = () => {
    onDrop(id);
    setDragStartID('');
    setDragOverID('');
  };

  return (
    <div
      id={id}
      draggable={isDraggable}
      onDragStart={() => setDragStartID(id)}
      onDragEnter={() => setDragOverID(id)}
      onDragEnd={() => {
        setDragStartID('');
        setDragOverID('');
      }}
      onDrop={handleDrop}
      className={isDraggable ? undefined : 'pb-3'}
    >
      <div id={id} className={dragClassName}></div>
      {id === dragStartID ? <div style={{ height: '3rem' }}></div> : children}
    </div>
  );
};

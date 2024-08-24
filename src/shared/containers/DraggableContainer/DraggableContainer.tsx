import { Dispatch, DragEvent, FC, ReactElement, SetStateAction, useRef, useState } from 'react';
import { OpenableContainer } from 'shared/containers/DraggableContainer/OpenableContainer/OpenableContainer.tsx';
import { useContainerPositionAnimation } from './hooks/useContainerPositionAnimation.ts';
import { dragStartPreventDefault } from './helpers/dragStartPreventDefault.ts';

interface DraggableItemProps {
  id: string;
  children?: ReactElement;
  isOpened: boolean;
  draggable?: boolean;
  onDrop: (dropID: string) => any;
  startID: string;
  setStartID: Dispatch<SetStateAction<string>>;
  setOverID: Dispatch<SetStateAction<string>>;
}

export const DraggableContainer: FC<DraggableItemProps> = ({
  id,
  children,
  isOpened,
  draggable,
  onDrop,
  startID,
  setStartID,
  setOverID,
}) => {
  const y = useRef<number>(0);
  const dy = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dyState, setDyState] = useState<number>(0);
  const [zIndex, setZIndex] = useState(1);

  const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
    dragStartPreventDefault(event);
    y.current = event.clientY;
    setStartID(id);
    setZIndex(2);
  };

  // Container position animation
  useContainerPositionAnimation({ startID, id, dy, setDyState, containerRef });

  const handleDrag = (event: DragEvent<HTMLDivElement>) => {
    dy.current += event.clientY - y.current;
    y.current = event.clientY;
  };

  const handleDragOver = () => {
    setOverID((state) => (state === id ? state : id));
  };

  const handleDrop = () => {
    onDrop(id);
    resetState();
  };

  const resetState = () => {
    setStartID('');
    setOverID('');
    setDyState(0);
    setZIndex(1);
    dy.current = 0;
  };

  return (
    <>
      <div
        ref={containerRef}
        draggable={draggable}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragOver={handleDragOver}
        onDragEnd={resetState}
        onDrop={handleDrop}
        style={{ zIndex: zIndex }}
      >
        <OpenableContainer
          className="bordered-emphasis rounded"
          style={{ borderStyle: 'dashed' }}
          isOpened={isOpened}
          style1={{ height: 0, marginTop: 0, borderWidth: 0 }}
          style2={{ height: 55, marginTop: 4, borderWidth: 2 }}
          duration={250}
        />

        <div
          style={{
            transform: `translateY(${dyState}px)`,
            pointerEvents: startID === id ? 'none' : undefined,
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
};

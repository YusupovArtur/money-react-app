import { cloneElement, Dispatch, DragEvent, FC, ReactElement, SetStateAction, useRef, useState } from 'react';
import { OpenableContainer } from 'shared/containers/DraggableContainer/OpenableContainer/OpenableContainer.tsx';

interface DraggableItemProps {
  id: string;
  children?: ReactElement;
  isOpened: boolean;
  draggable?: boolean;
  onDrop: (dropID: string) => void;
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
  const y = useRef<number | null>(null);
  const dy = useRef<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const containerPositionRef = useRef<number | null>(null);
  const containerDyRef = useRef<number>(0);

  const [dyState, setDyState] = useState<number>(0);

  const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
    const img = new Image();
    img.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"></svg>';
    event.dataTransfer.setDragImage(img, 0, 0);
    event.dataTransfer.clearData();

    y.current = event.clientY;
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      containerPositionRef.current = rect.top;
    }

    setStartID(id);
  };

  const handleDrag = (event: DragEvent<HTMLDivElement>) => {
    if (y.current !== null) {
      dy.current += event.clientY - y.current;
      y.current = event.clientY;
    }
    if (containerRef.current && containerPositionRef.current !== null) {
      const rect = containerRef.current.getBoundingClientRect();
      containerDyRef.current = containerPositionRef.current - rect.top;
    }

    setDyState(dy.current + containerDyRef.current);
  };
  const requestAnimationFrameHandleDrag = (event: DragEvent<HTMLDivElement>) => {
    requestAnimationFrame(() => handleDrag(event));
  };

  const handleDragOver = () => {
    setOverID((state) => {
      if (state === id) {
        return state;
      } else {
        return id;
      }
    });
  };

  const resetState = () => {
    setStartID('');
    setOverID('');
    setDyState(0);
    dy.current = 0;
    y.current = null;
    containerPositionRef.current = null;
  };

  const handleDrop = () => {
    onDrop(id);
    resetState();
  };

  return (
    <>
      <div
        ref={containerRef}
        draggable={draggable}
        onDragStart={handleDragStart}
        onDrag={requestAnimationFrameHandleDrag}
        onDragOver={handleDragOver}
        onDragEnd={resetState}
        onDrop={handleDrop}
      >
        <OpenableContainer
          className={'bordered-emphasis rounded'}
          style={{ borderStyle: 'dashed' }}
          isOpened={isOpened}
          style1={{ height: 0, marginTop: 0, borderWidth: 0 }}
          style2={{ height: 55, marginTop: 4, borderWidth: 2 }}
          duration={250}
        />
        {children
          ? cloneElement(children, {
              style: {
                transform: `translateY(${dyState}px)`,
                pointerEvents: startID === id ? 'none' : undefined,
              },
            })
          : undefined}
      </div>
    </>
  );
};

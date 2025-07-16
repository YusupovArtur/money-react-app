import { DragEvent, ReactElement, useRef, useState } from 'react';
import { OpenableContainer } from 'shared/containers/DraggableContainer/OpenableContainer/OpenableContainer.tsx';
import { useContainerPositionAnimation } from './hooks/useContainerPositionAnimation.ts';
import { dragStartPreventDefault } from './helpers/dragStartPreventDefault.ts';
import { AnimationStyleType } from 'shared/containers/DraggableContainer/OpenableContainer/types/AnimationStyleType.ts';

interface SignatureWithStyle {
  style1: AnimationStyleType;
  style2: AnimationStyleType;
}

interface SignatureWithoutStyle {
  style1?: never;
  style2?: never;
}

interface DraggableItemRestProps<T> {
  index: T;
  children?: ReactElement;
  draggable?: boolean;
  isOpened: { up: boolean; down: boolean };
  startIndex: T;
  setStartIndex: (value: T | ((prev: T) => T)) => any;
  setOverIndex: (value: T | ((prev: T) => T)) => any;
  onDrop?: (index: T) => any;
  zIndex?: number;
}

type DraggableItemProps<T> = DraggableItemRestProps<T> & (SignatureWithStyle | SignatureWithoutStyle);

export const DraggableContainer = <T,>({
  index,
  children,
  isOpened,
  draggable = true,
  startIndex,
  setStartIndex,
  setOverIndex,
  onDrop,
  zIndex = 1,
  style1,
  style2,
}: DraggableItemProps<T>) => {
  const y = useRef<number>(0);
  const dy = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dyState, setDyState] = useState<number>(0);

  const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
    dragStartPreventDefault(event);
    y.current = event.clientY;
    setStartIndex(index);
  };

  // Container position animation
  useContainerPositionAnimation({ startIndex: startIndex, index: index, dy, setDyState, containerRef });

  const handleDrag = (event: DragEvent<HTMLDivElement>) => {
    dy.current += event.clientY - y.current;
    y.current = event.clientY;
  };

  const handleDragOver = () => {
    setOverIndex((state) => (state === index ? state : index));
  };

  const handleDrop = () => {
    if (onDrop) onDrop(index);
    resetState();
  };

  const resetState = () => {
    setStartIndex(undefined as T);
    setOverIndex(undefined as T);
    setDyState(0);
    dy.current = 0;
  };

  const defaultStyle1 = { height: 0, marginTop: 0, borderWidth: 0 };
  const defaultStyle2 = { height: 51.2, marginTop: 4, borderWidth: 2 };

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
        style={{ zIndex: startIndex === index ? zIndex : undefined }}
      >
        {/*Openable Container for animation*/}
        <OpenableContainer
          className="bordered-strong rounded"
          style={{ borderStyle: 'dashed' }}
          isOpened={isOpened.up}
          style1={style1 ?? defaultStyle1}
          style2={style2 ?? defaultStyle2}
          duration={250}
        />

        <div style={{ transform: `translateY(${dyState}px)`, pointerEvents: startIndex === index ? 'none' : undefined }}>
          {children}
        </div>

        {/*Openable Container for animation*/}
        <OpenableContainer
          className="bordered-strong rounded"
          style={{ borderStyle: 'dashed' }}
          isOpened={isOpened.down}
          style1={style1 ?? defaultStyle1}
          style2={style2 ?? defaultStyle2}
          duration={250}
        />
      </div>
    </>
  );
};

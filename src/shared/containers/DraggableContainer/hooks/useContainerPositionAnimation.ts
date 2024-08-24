import { Dispatch, MutableRefObject, RefObject, SetStateAction, useEffect, useRef } from 'react';
import { canselAnimation } from 'shared/containers/DraggableContainer/helpers/cancelAnimation.ts';
import { getContainerPositionY } from 'shared/containers/DraggableContainer/helpers/getContainerPositionY.ts';

export const useContainerPositionAnimation = (props: {
  startID: string;
  id: string;
  dy: MutableRefObject<number>;
  setDyState: Dispatch<SetStateAction<number>>;
  containerRef: RefObject<HTMLDivElement>;
}) => {
  const { startID, id, dy, setDyState, containerRef } = props;
  const containerYRef = useRef<number | null>(null);
  const containerDyRef = useRef<number>(0);

  const containerPositionAnimation = () => {
    if (containerRef.current && containerYRef.current !== null) {
      const rect = containerRef.current.getBoundingClientRect();
      containerDyRef.current = containerYRef.current - rect.top;
    }
    setDyState(dy.current + containerDyRef.current);
    if (startID === id) {
      animationRef.current = requestAnimationFrame(containerPositionAnimation);
    }
  };

  const animationRef = useRef<number | null>(null);
  useEffect(() => {
    canselAnimation(animationRef.current);
    if (startID === id) {
      containerYRef.current = getContainerPositionY(containerRef.current);
      animationRef.current = requestAnimationFrame(containerPositionAnimation);
    }
    return () => {
      canselAnimation(animationRef.current);
    };
  }, [startID]);
};

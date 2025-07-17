import { RefObject, TouchEvent as ReactTouchEvent } from 'react';
import { CoordsType } from '../types/CoordsType.ts';
import { getTouchCoords } from '../helpers/getTouchCoords.ts';

export const onTouchStart = (props: {
  event: ReactTouchEvent<HTMLCanvasElement> | TouchEvent;
  touch: RefObject<CoordsType | null>;
  touch1: RefObject<CoordsType | null>;
  touch2: RefObject<CoordsType | null>;
}) => {
  const { event, touch, touch1, touch2 } = props;

  event.preventDefault();
  event.stopPropagation();

  if (event.touches.length === 1) {
    touch.current = getTouchCoords(event.touches[0]);
  }
  if (event.touches.length === 2) {
    touch1.current = getTouchCoords(event.touches[0]);
    touch2.current = getTouchCoords(event.touches[1]);
  }
};

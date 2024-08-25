import { MutableRefObject, TouchEvent as ReactTouchEvent } from 'react';
import { CoordsType } from '../types/CoordsType.ts';
import { getTouchVector } from '../helpers/getTouchVector.ts';
import { getTouchCoords } from '../helpers/getTouchCoords.ts';
import { abs } from '../helpers/abs.ts';
import { dot } from '../helpers/dot.ts';
import { multiply } from '../helpers/multiply.ts';

export const onTouchMove = (props: {
  event: ReactTouchEvent<HTMLCanvasElement> | TouchEvent;
  drawImage: () => void;
  moveCoords: (props: { dx: number; dy: number; dScale: number }) => void;
  scale: MutableRefObject<number>;
  touch: MutableRefObject<CoordsType | null>;
  touch1: MutableRefObject<CoordsType | null>;
  touch2: MutableRefObject<CoordsType | null>;
}) => {
  const { event, drawImage, moveCoords, scale, touch, touch1, touch2 } = props;

  event.preventDefault();
  event.stopPropagation();

  if (event.touches.length === 1 && touch.current !== null) {
    const touchVector = getTouchVector({ coords2: event.touches[0], coords1: touch.current });
    moveCoords({ dx: touchVector.x, dy: touchVector.y, dScale: 0 });
    drawImage();
    touch.current = getTouchCoords(event.touches[0]);
  }

  if (event.touches.length === 2 && touch1.current !== null && touch2.current !== null) {
    const touchVector1 = getTouchVector({ coords2: event.touches[0], coords1: touch1.current });
    const touchVector2 = getTouchVector({ coords2: event.touches[1], coords1: touch2.current });

    const touchesDist = abs(getTouchVector({ coords1: event.touches[0], coords2: event.touches[1] }));
    const touchesDistVector1 = getTouchVector({ coords2: event.touches[1], coords1: event.touches[0] });
    const touchesDistVector2 = getTouchVector({ coords2: event.touches[0], coords1: event.touches[1] });

    const scrollDist1 = dot(touchVector1, touchesDistVector1) / touchesDist;
    const scrollDist2 = dot(touchVector2, touchesDistVector2) / touchesDist;

    const scrollVector1 = multiply({ k: scrollDist1 / touchesDist, vector: touchVector1 });
    const scrollVector2 = multiply({ k: scrollDist2 / touchesDist, vector: touchVector2 });

    const moveVector: CoordsType = {
      x: (touchVector1.x - scrollVector1.x) / 2 + (touchVector2.x - scrollVector2.x) / 2,
      y: (touchVector1.y - scrollVector1.y) / 2 + (touchVector2.y - scrollVector2.y) / 2,
    };

    const dScale = (touchesDist - scrollDist1 - scrollDist2) / touchesDist;
    scale.current = Math.min(Math.max(scale.current / dScale, 0.2), 1);

    touch1.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
    touch2.current = { x: event.touches[1].clientX, y: event.touches[1].clientY };

    moveCoords({ dx: moveVector.x, dy: moveVector.y, dScale: 0 });
    drawImage();
  }
};

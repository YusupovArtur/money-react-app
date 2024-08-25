import { Touch as ReactTouch } from 'react';
import { getTouchCoords } from './getTouchCoords.ts';
import { CoordsType } from '../types/CoordsType.ts';

const getCoords = (coords: CoordsType | ReactTouch | Touch): CoordsType => {
  if ('identifier' in coords || coords instanceof Touch) {
    return getTouchCoords(coords);
  }
  return coords;
};

export const getTouchVector = (props: {
  coords1: CoordsType | ReactTouch | Touch;
  coords2: CoordsType | ReactTouch | Touch;
}): CoordsType => {
  const coords1 = getCoords(props.coords1);
  const coords2 = getCoords(props.coords2);

  return { x: coords2.x - coords1.x, y: coords2.y - coords1.y };
};

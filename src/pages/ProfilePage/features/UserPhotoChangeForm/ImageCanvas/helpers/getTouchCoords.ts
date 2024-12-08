import { Touch as ReactTouch } from 'react';
import { CoordsType } from '../types/CoordsType.ts';

export const getTouchCoords = (touch: ReactTouch | Touch): CoordsType => {
  return { x: touch.clientX, y: touch.clientY };
};

import { CoordsType } from '../types/CoordsType.ts';

export const dot = (coords1: CoordsType, coords2: CoordsType): number => {
  return coords1.x * coords2.x + coords1.y * coords2.y;
};

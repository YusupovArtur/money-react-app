import { CoordsType } from '../types/CoordsType.ts';

export const abs = (vector: CoordsType): number => {
  return Math.sqrt(vector.x ** 2 + vector.y ** 2);
};

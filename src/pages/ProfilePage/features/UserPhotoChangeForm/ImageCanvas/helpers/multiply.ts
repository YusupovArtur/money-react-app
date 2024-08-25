import { CoordsType } from '../types/CoordsType.ts';

export const multiply = (props: { k: number; vector: CoordsType }): CoordsType => {
  const { k, vector } = props;

  return { x: k * vector.x, y: k * vector.y };
};

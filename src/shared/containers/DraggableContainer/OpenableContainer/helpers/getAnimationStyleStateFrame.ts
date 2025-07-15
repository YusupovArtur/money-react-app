import { AnimationStyleNumberType } from '../types/AnimationStyleNumberType.ts';
import { clamp } from 'shared/helpers';

const interpolate = (start: number, end: number, ratio: number): number => start + (end - start) * ratio;

export const getAnimationStyleStateFrame = (
  style1: AnimationStyleNumberType,
  style2: AnimationStyleNumberType,
  ratio: number,
): AnimationStyleNumberType => {
  const newStyle: AnimationStyleNumberType = {};

  for (const key in style1) {
    if (
      style1[key as keyof AnimationStyleNumberType] !== undefined &&
      style2[key as keyof AnimationStyleNumberType] !== undefined
    ) {
      newStyle[key as keyof AnimationStyleNumberType] = interpolate(
        style1[key as keyof AnimationStyleNumberType] as number,
        style2[key as keyof AnimationStyleNumberType] as number,
        clamp(ratio, 0, 1),
      );
    }
  }

  return newStyle;
};

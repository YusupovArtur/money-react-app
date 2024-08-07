import { AnimationStyleNumberState } from '../types/AnimationStateTypes.ts';

const interpolate = (start: number, end: number, ratio: number): number => start + (end - start) * ratio;

export const getAnimationStyleStateFrame = (
  style1: AnimationStyleNumberState,
  style2: AnimationStyleNumberState,
  ratio: number,
): AnimationStyleNumberState => {
  const newStyle: AnimationStyleNumberState = {};

  for (const key in style1) {
    if (
      style1[key as keyof AnimationStyleNumberState] !== undefined &&
      style2[key as keyof AnimationStyleNumberState] !== undefined
    ) {
      newStyle[key as keyof AnimationStyleNumberState] = interpolate(
        style1[key as keyof AnimationStyleNumberState] as number,
        style2[key as keyof AnimationStyleNumberState] as number,
        Math.min(Math.max(ratio, 0), 1),
      );
    }
  }

  return newStyle;
};

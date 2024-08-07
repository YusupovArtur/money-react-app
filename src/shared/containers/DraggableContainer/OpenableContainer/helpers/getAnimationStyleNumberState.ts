import { AnimationStyleNumberState, AnimationStyleState, Size } from '../types/AnimationStateTypes.ts';

export const getAnimationStyleNumberState = (style: AnimationStyleState): AnimationStyleNumberState => {
  const numberStyle: AnimationStyleNumberState = {};
  for (const key in style) {
    if (style[key as keyof AnimationStyleState] !== undefined) {
      const field = style[key as keyof AnimationStyleState] as Size;
      if (typeof field === 'number') {
        numberStyle[key as keyof AnimationStyleState] = field;
      } else {
        numberStyle[key as keyof AnimationStyleState] = parseFloat(field) * (field.includes('rem') ? 16 : 1);
      }
    }
  }
  return numberStyle;
};

import { SizeType } from '../types/SizeType.ts';
import { AnimationStyleType } from '../types/AnimationStyleType.ts';
import { AnimationStyleNumberType } from '../types/AnimationStyleNumberType.ts';

export const getAnimationStyleNumberState = (style: AnimationStyleType): AnimationStyleNumberType => {
  const numberStyle: AnimationStyleNumberType = {};
  for (const key in style) {
    if (style[key as keyof AnimationStyleType] !== undefined) {
      const field = style[key as keyof AnimationStyleType] as SizeType;
      if (typeof field === 'number') {
        numberStyle[key as keyof AnimationStyleType] = field;
      } else {
        numberStyle[key as keyof AnimationStyleType] = parseFloat(field) * (field.includes('rem') ? 16 : 1);
      }
    }
  }
  return numberStyle;
};

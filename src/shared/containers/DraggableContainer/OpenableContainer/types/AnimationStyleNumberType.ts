import { AnimationStyleType } from './AnimationStyleType.ts';

export type AnimationStyleNumberType<T extends AnimationStyleType = AnimationStyleType> = {
  [K in keyof T]: number;
};

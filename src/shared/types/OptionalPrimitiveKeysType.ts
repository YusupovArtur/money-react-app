import { Primitive } from './Primitive.ts';

export type OptionalPrimitiveKeysType<T, U extends Primitive> = {
  [K in keyof T]?: U;
};

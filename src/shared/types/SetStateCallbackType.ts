export type SetStateCallbackType<T> = (value: T | ((prev: T) => T)) => any;

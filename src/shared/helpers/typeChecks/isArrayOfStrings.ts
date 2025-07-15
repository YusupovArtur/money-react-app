export const isArrayOfStrings = (obj: unknown): obj is string[] => {
  return Array.isArray(obj) && obj.every((item) => typeof item === 'string');
};

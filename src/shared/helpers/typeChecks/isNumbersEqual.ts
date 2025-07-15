export const isNumbersEqual = (n1: number, n2: number): boolean => {
  if (isNaN(n1) && isNaN(n2)) {
    return true;
  }
  return n1 === n2;
};

export const getNumberFromText = (numberString: string): number => {
  if (!numberString || numberString === '-' || numberString === '.' || numberString === '-.') {
    return 0;
  } else {
    return parseFloat(numberString);
  }
};

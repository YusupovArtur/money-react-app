export const getNumberFromText = (props: { numberString: string; isCanSetNaN?: boolean }): number => {
  const { numberString, isCanSetNaN } = props;

  if (!numberString || numberString === '-' || numberString === '.' || numberString === '-.') {
    if (isCanSetNaN) {
      return NaN;
    } else {
      return 0;
    }
  } else {
    return parseFloat(numberString);
  }
};

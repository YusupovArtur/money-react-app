export const getDividedTextNumber = (numberText: string): [string, string, string] => {
  const getDividedAbsNumber = (s: string, divider: string): [string, string] => {
    const dividerPosition = s.indexOf(divider);
    if (dividerPosition === -1) {
      return [s, ''];
    } else {
      return [s.slice(0, dividerPosition), s.slice(dividerPosition)];
    }
  };

  const numberSign = numberText.slice(0, numberText.indexOf('-') + 1);
  const numberAbs = numberText.slice(numberText.indexOf('-') + 1);
  const [numberIntegerPart, numberFloatPart] = getDividedAbsNumber(numberAbs, '.');

  return [numberSign, numberIntegerPart, numberFloatPart];
};

export const getFormatedTextNumber = (numberText: string): string => {
  let numberTextValid: string = numberText.replace(/[^-.,\d]/g, '').replace(/,/g, '.');

  numberTextValid =
    numberTextValid.indexOf('-') > -1
      ? numberTextValid.slice(0, 1) + numberTextValid.slice(1).replace(/-/g, '')
      : numberTextValid;

  const firstDotIndex = numberTextValid.indexOf('.') + 1;
  numberTextValid =
    firstDotIndex > 0
      ? numberTextValid.slice(0, firstDotIndex) + numberTextValid.slice(firstDotIndex).replace(/[.]/g, '').slice(0, 2)
      : numberTextValid;

  return numberTextValid;
};

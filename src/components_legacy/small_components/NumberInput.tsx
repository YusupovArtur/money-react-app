import { FC } from 'react';

const getNumberFromString = (numberString: string): number => {
  const formatedText = getFormatedStringNumber(numberString);
  if (!formatedText || formatedText === '-' || formatedText === '.' || formatedText === '-.') {
    return 0;
  } else {
    return parseFloat(formatedText);
  }
};

const getFormatedStringNumber = (numberString: string): string => {
  let formatedText: string = numberString.replace(/[^-.,\d]/g, '').replace(',', '.');
  if (formatedText.indexOf('-') > -1) {
    formatedText = formatedText.slice(0, 1) + formatedText.slice(1).replace(/[-]/g, '');
  }
  const firstDot = formatedText.indexOf('.') + 1;
  if (firstDot > 0) {
    formatedText = formatedText.slice(0, firstDot) + formatedText.slice(firstDot).replace(/[.]/g, '').slice(0, 2);
  }
  return formatedText;
};

const NumberInput: FC<{
  stringNumber: string;
  setStringNumber: React.Dispatch<React.SetStateAction<string>>;
  setNumberFunction?: (number: number) => void;
}> = ({ stringNumber, setStringNumber, setNumberFunction }) => {
  return (
    <input
      type="text"
      value={stringNumber}
      onChange={(event) => {
        setStringNumber(() => {
          if (setNumberFunction) setNumberFunction(getNumberFromString(event.target.value));
          return getFormatedStringNumber(event.target.value);
        });
      }}
      onFocus={() => {
        if (stringNumber === '0') setStringNumber('');
      }}
      onBlur={() => {
        if (!stringNumber) {
          setStringNumber('0');
        } else {
          setStringNumber((state) => parseFloat(getFormatedStringNumber(state)).toString());
        }
      }}
      style={{ fontSize: '1.08rem' }}
      className="form-control py-1 px-2"
      autoComplete="off"
    />
  );
};

export default NumberInput;

import { ChangeEvent, FC, FocusEvent, InputHTMLAttributes, useEffect, useRef, useState } from 'react';
// UI
import { TextInput } from 'shared/inputs';
// Helpers
import { getFormatedTextNumber } from './helpers/getFormatedTextNumber';
import { getNumberFromText } from './helpers/getNumberFromText';
import { getCursorShift } from 'shared/inputs/NumberInput/helpers/getCursorShift';
import { isNumbersEqual } from 'shared/helpers';

interface NumberInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value'> {
  number: number;
  setNumber: (number: number) => any;
  isCanSetNaN?: boolean;
  isPositive?: boolean;
}

export const NumberInput: FC<NumberInputProps> = ({
  number,
  setNumber,
  isCanSetNaN,
  isPositive = false,
  onFocus,
  onBlur,
  ...props
}) => {
  const [textNumber, setTextNumber] = useState<string>('0');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isNumbersEqual(number, getNumberFromText({ numberString: textNumber, isCanSetNaN }))) {
      if (!Number.isNaN(number)) {
        setTextNumber(number.toString());
      } else {
        if (isCanSetNaN) {
          setTextNumber('');
        } else {
          setTextNumber('NaN');
        }
      }
    }
  }, [number]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const formatedTextNumber = getFormatedTextNumber(event.target.value, isPositive);
    const cursorPosition =
      event.target.selectionStart || event.target.selectionStart === 0
        ? event.target.selectionStart - getCursorShift(event.target.value, formatedTextNumber, event.target.selectionStart)
        : null;
    setTextNumber(formatedTextNumber);
    setNumber(getNumberFromText({ numberString: formatedTextNumber, isCanSetNaN }));
    requestAnimationFrame(() => {
      if (inputRef.current) {
        inputRef.current.selectionStart = cursorPosition;
        inputRef.current.selectionEnd = cursorPosition;
      }
    });
  };

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    if (!isCanSetNaN && textNumber === '0') {
      setTextNumber('');
    }

    if (onFocus) {
      onFocus(event);
    }
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (!isCanSetNaN) {
      if (!textNumber) {
        setTextNumber('0');
      } else {
        setTextNumber((state) =>
          getNumberFromText({ numberString: getFormatedTextNumber(state, isPositive), isCanSetNaN }).toString(),
        );
      }
    } else {
      if (isNaN(getNumberFromText({ numberString: textNumber, isCanSetNaN }))) {
        setTextNumber('');
      } else {
        setTextNumber((state) =>
          getNumberFromText({ numberString: getFormatedTextNumber(state, isPositive), isCanSetNaN }).toString(),
        );
      }
    }

    if (onBlur) {
      onBlur(event);
    }
  };

  return (
    <TextInput
      type="text"
      value={textNumber}
      ref={inputRef}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...props}
    />
  );
};

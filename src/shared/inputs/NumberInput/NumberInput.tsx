import { ChangeEvent, FC, FocusEvent, InputHTMLAttributes, useEffect, useRef, useState } from 'react';
// UI
import { TextInput } from 'shared/inputs';
// Helpers
import { getFormatedTextNumber } from './helpers/getFormatedTextNumber';
import { getNumberFromText } from './helpers/getNumberFromText';
import { getCursorShift } from 'shared/inputs/NumberInput/helpers/getCursorShift';

interface NumberInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value'> {
  number: number;
  setNumber: (number: number) => any;
}

export const NumberInput: FC<NumberInputProps> = ({ number, setNumber, onFocus, onBlur, ...props }) => {
  const [textNumber, setTextNumber] = useState<string>('0');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (number !== getNumberFromText(textNumber)) {
      if (!Number.isNaN(number)) {
        setTextNumber(number.toString());
      } else {
        setTextNumber('NaN');
      }
    }
  }, [number]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const formatedTextNumber = getFormatedTextNumber(event.target.value);
    const cursorPosition =
      event.target.selectionStart || event.target.selectionStart === 0
        ? event.target.selectionStart - getCursorShift(event.target.value, formatedTextNumber, event.target.selectionStart)
        : null;
    setTextNumber(formatedTextNumber);
    setNumber(getNumberFromText(formatedTextNumber));
    requestAnimationFrame(() => {
      if (inputRef.current) {
        inputRef.current.selectionStart = cursorPosition;
        inputRef.current.selectionEnd = cursorPosition;
      }
    });
  };

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    if (textNumber === '0') {
      setTextNumber('');
    }

    if (onFocus) {
      onFocus(event);
    }
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (!textNumber) {
      setTextNumber('0');
    } else {
      setTextNumber((state) => getNumberFromText(getFormatedTextNumber(state)).toString());
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

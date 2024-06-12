import React, { useState, useEffect, useRef } from 'react';

const getNumberFromString = (text: string): number => {
  const formatedText = getFormatedStringNumber(text);
  if (!formatedText || formatedText === '-' || formatedText === '.' || formatedText === '-.') {
    return 0;
  } else {
    return parseFloat(formatedText);
  }
};

const getFormatedStringNumber = (text: string): string => {
  let formatedText: string = text.replace(/[^-.,\d]/g, '').replace(',', '.');
  if (formatedText.indexOf('-') > -1) {
    formatedText = formatedText.slice(0, 1) + formatedText.slice(1).replace(/[-]/g, '');
  }
  const firstDot = formatedText.indexOf('.') + 1;
  if (firstDot > 0) formatedText = formatedText.slice(0, firstDot) + formatedText.slice(firstDot).replace(/[.]/g, '').slice(0, 2);
  return formatedText;
};

const NumberInput: React.FC<{
  number: number;
  setNumber: (number: number) => void;
  id?: string;
}> = ({ number, setNumber, id }) => {
  const [text, setText] = useState<string>('0');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!number) {
      if (document.activeElement !== inputRef.current && getNumberFromString(text)) {
        setText(number || number === 0 ? number.toString() : '');
      }
    }
  }, [number]);

  return (
    <input
      type="text"
      value={text}
      onChange={(event) => {
        setNumber(getNumberFromString(event.target.value));
        setText(getFormatedStringNumber(event.target.value));
      }}
      onFocus={() => {
        if (text === '0') setText('');
      }}
      onBlur={() => {
        if (!text) {
          setText('0');
        } else {
          setText(number.toString());
        }
      }}
      ref={inputRef}
      id={id}
      style={{ fontSize: '1.08rem' }}
      className="form-control py-1 px-2"
      autoComplete="off"
    />
  );
};

export default NumberInput;

import { RefObject } from 'react';
import { DateStateType } from 'shared/inputs/DateInput/types/DateStateType.ts';

export const setDateInputSelection = (props: {
  inputRef: RefObject<HTMLInputElement | null>;
  selection: keyof DateStateType;
}): void => {
  const { inputRef, selection } = props;

  if (inputRef.current) {
    switch (selection) {
      case 'day':
        inputRef.current.selectionStart = 0;
        inputRef.current.selectionEnd = 2;
        break;
      case 'month':
        inputRef.current.selectionStart = 3;
        inputRef.current.selectionEnd = 5;
        break;
      case 'year':
        inputRef.current.selectionStart = 6;
        inputRef.current.selectionEnd = 10;
        break;
    }
  }
};

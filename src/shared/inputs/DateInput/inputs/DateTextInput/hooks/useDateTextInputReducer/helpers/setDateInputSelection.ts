import { RefObject } from 'react';
import { DateInputSelectionType } from 'shared/inputs/DateInput/inputs/DateTextInput/hooks/useDateTextInputReducer/DateInputSelectionType.ts';

export const setDateInputSelection = (props: {
  inputRef: RefObject<HTMLInputElement | null>;
  selection: DateInputSelectionType;
}): void => {
  const { inputRef, selection } = props;

  if (inputRef.current) {
    if (selection.part === 1) {
      switch (selection.key) {
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

    if (selection.part === 2) {
      switch (selection.key) {
        case 'day':
          inputRef.current.selectionStart = 11;
          inputRef.current.selectionEnd = 13;
          break;
        case 'month':
          inputRef.current.selectionStart = 14;
          inputRef.current.selectionEnd = 16;
          break;
        case 'year':
          inputRef.current.selectionStart = 17;
          inputRef.current.selectionEnd = 21;
          break;
      }
    }
  }
};

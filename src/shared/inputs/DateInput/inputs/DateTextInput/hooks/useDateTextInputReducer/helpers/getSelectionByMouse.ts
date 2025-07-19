import { RefObject } from 'react';
import { DateInputSelectionType } from 'shared/inputs/DateInput/inputs/DateTextInput/hooks/useDateTextInputReducer/DateInputSelectionType.ts';

export const getSelectionByMouse = (props: { inputRef: RefObject<HTMLInputElement | null> }): DateInputSelectionType => {
  const { inputRef } = props;

  if (inputRef.current && inputRef.current.selectionStart !== null) {
    const selectionStart = inputRef.current.selectionStart;

    if (selectionStart >= 0 && selectionStart < 3) {
      return { part: 1, key: 'day' };
    }

    if (selectionStart >= 3 && selectionStart < 6) {
      return { part: 1, key: 'month' };
    }

    if (selectionStart >= 6 && selectionStart < 11) {
      return { part: 1, key: 'year' };
    }

    if (selectionStart >= 11 && selectionStart < 14) {
      return { part: 2, key: 'day' };
    }

    if (selectionStart >= 14 && selectionStart < 17) {
      return { part: 2, key: 'month' };
    }

    if (selectionStart >= 17 && selectionStart < 22) {
      return { part: 2, key: 'year' };
    }
  }

  return { part: 1, key: 'day' };
};

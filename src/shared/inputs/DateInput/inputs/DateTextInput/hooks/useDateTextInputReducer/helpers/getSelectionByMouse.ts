import { RefObject } from 'react';
import { DateStateType } from 'shared/inputs/DateInput/types/DateStateType.ts';

export const getSelectionByMouse = (props: { inputRef: RefObject<HTMLInputElement | null> }): keyof DateStateType => {
  const { inputRef } = props;

  if (inputRef.current && inputRef.current.selectionStart !== null) {
    const selectionStart = inputRef.current.selectionStart;

    if (selectionStart >= 0 && selectionStart < 3) {
      return 'day';
    }

    if (selectionStart >= 3 && selectionStart < 6) {
      return 'month';
    }

    if (selectionStart >= 6 && selectionStart < 12) {
      return 'year';
    }
  }

  return 'day';
};

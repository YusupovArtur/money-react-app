import { MutableRefObject, RefObject } from 'react';
import { DateFieldName } from 'shared/inputs/DateInput/types/DateFieldName.ts';

export const setDateInputSelectionPartRefByMouse = (props: {
  dateInputRef: RefObject<HTMLInputElement>;
  selectedPartRef: MutableRefObject<DateFieldName>;
}) => {
  const { dateInputRef, selectedPartRef } = props;

  if (dateInputRef.current && dateInputRef.current.selectionStart !== null) {
    const selectionStart = dateInputRef.current.selectionStart;

    if (selectionStart >= 0 && selectionStart < 3) {
      selectedPartRef.current = 'day';
    }

    if (selectionStart >= 3 && selectionStart < 6) {
      selectedPartRef.current = 'month';
    }

    if (selectionStart >= 6 && selectionStart < 12) {
      selectedPartRef.current = 'year';
    }
  }
};

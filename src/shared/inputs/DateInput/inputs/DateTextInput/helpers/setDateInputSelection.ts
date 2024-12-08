import { MutableRefObject } from 'react';
import { DateFieldName } from 'shared/inputs/DateInput/types/DateFieldName.ts';

export const setDateInputSelection = (props: {
  dateInputRef: MutableRefObject<HTMLInputElement | null>;
  selectedPart: DateFieldName;
}): void => {
  const { dateInputRef, selectedPart } = props;

  if (dateInputRef.current) {
    switch (selectedPart) {
      case 'day':
        dateInputRef.current.selectionStart = 0;
        dateInputRef.current.selectionEnd = 2;
        break;
      case 'month':
        dateInputRef.current.selectionStart = 3;
        dateInputRef.current.selectionEnd = 5;
        break;
      case 'year':
        dateInputRef.current.selectionStart = 6;
        dateInputRef.current.selectionEnd = 10;
        break;
    }
  }
};

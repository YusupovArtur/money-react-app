import { MutableRefObject } from 'react';
import { DateFieldName } from 'shared/inputs/DateInput/types/DateFieldName.ts';

export const setDateInputSelectionPartRefByKeyboard = (props: {
  key: string;
  selectedPartRef: MutableRefObject<DateFieldName>;
}) => {
  const { key, selectedPartRef } = props;

  if (key === 'ArrowRight') {
    switch (selectedPartRef.current) {
      case 'day':
        selectedPartRef.current = 'month';
        break;
      case 'month':
        selectedPartRef.current = 'year';
        break;
    }
  }

  if (key === 'ArrowLeft') {
    switch (selectedPartRef.current) {
      case 'month':
        selectedPartRef.current = 'day';
        break;
      case 'year':
        selectedPartRef.current = 'month';
        break;
    }
  }
};

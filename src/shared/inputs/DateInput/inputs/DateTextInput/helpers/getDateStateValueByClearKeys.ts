import { DateFieldName } from 'shared/inputs/DateInput/types/DateFieldName.ts';
import { DateStateType } from 'shared/inputs/DateInput/types/DateStateType.ts';

export const getDateStateValueByClearKeys = (props: {
  key: string;
  dateState: DateStateType;
  selectedPart: DateFieldName;
}): DateStateType => {
  const { key, dateState, selectedPart } = props;

  if (key === 'Backspace') {
    return { ...dateState, [selectedPart]: 0 };
  }

  if (key === 'Delete') {
    return { day: 0, month: 0, year: 0 };
  }

  return dateState;
};

import { DateStateType } from 'shared/inputs/DateInput/types/DateStateType.ts';

export const getClearedDateState = (props: {
  key: 'Backspace' | 'Delete';
  dateState: DateStateType;
  selection: keyof DateStateType;
}): DateStateType => {
  const { key, dateState, selection } = props;

  if (key === 'Backspace') {
    return { ...dateState, [selection]: 0 };
  }

  if (key === 'Delete') {
    return { day: 0, month: 0, year: 0 };
  }

  return dateState;
};

import { DateStateRangeType, DateStateType, isDateState, isDateStateRange } from 'shared/inputs/DateInput/types/DateStateType.ts';
import { DateInputSelectionType } from 'shared/inputs/DateInput/inputs/DateTextInput/hooks/useDateTextInputReducer/DateInputSelectionType.ts';

export const getClearedDateState = <T extends DateStateType | DateStateRangeType>(props: {
  key: 'Backspace' | 'Delete';
  dateState: T;
  selection: DateInputSelectionType;
}): T => {
  const { key, dateState, selection } = props;
  const defaultDateState: DateStateType = { day: 0, month: 0, year: 0 };
  const defaultDateStateRange: DateStateRangeType = { 1: defaultDateState, 2: defaultDateState };

  if (key === 'Backspace') {
    if (isDateState(dateState)) {
      return { ...dateState, [selection.key]: 0 };
    }

    if (isDateStateRange(dateState)) {
      return { ...dateState, [selection.part]: { ...dateState[selection.part], [selection.key]: 0 } };
    }
  }

  if (key === 'Delete') {
    if (isDateState(dateState)) {
      return defaultDateState as T;
    }

    if (isDateStateRange(dateState)) {
      return defaultDateStateRange as T;
    }
  }

  return dateState;
};

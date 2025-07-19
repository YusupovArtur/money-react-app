import { DateStateRangeType, DateStateType, isDateState } from 'shared/inputs/DateInput/types/DateStateType.ts';
import { MAX_YEAR, MIN_YEAR } from 'shared/inputs/DateInput/constants/constants.ts';
import { clamp, DigitChar, isDigitChar } from 'shared/helpers';
import { DateInputSelectionType } from 'shared/inputs/DateInput/inputs/DateTextInput/hooks/useDateTextInputReducer/DateInputSelectionType.ts';

const getDateStatePart = (props: {
  dateState: DateStateType | DateStateRangeType;
  selection: DateInputSelectionType;
  isZeroPart?: boolean;
}): number => {
  const { dateState, selection, isZeroPart = true } = props;
  const currentDateState = isDateState(dateState) ? dateState : dateState[selection.part];

  if (!isZeroPart && currentDateState[selection.key] <= 0) {
    switch (selection.key) {
      case 'day':
        return new Date().getDate();
      case 'month':
        return new Date().getMonth() + 1;
      case 'year':
        return new Date().getFullYear();
      default:
        return 0;
    }
  }

  return currentDateState[selection.key];
};

export const getNewDateStateFieldValueByAdjust = (props: {
  key: 'ArrowUp' | 'ArrowDown';
  dateState: DateStateType | DateStateRangeType;
  selection: DateInputSelectionType;
}): number => {
  const { dateState, selection, key } = props;

  if (key === 'ArrowUp' || key === 'ArrowDown') {
    const change = key === 'ArrowUp' ? 1 : key === 'ArrowDown' ? -1 : 0;
    const isChange = getDateStatePart({ dateState: dateState, selection: selection }) > 0 ? 1 : 0;

    const newPartValue = getDateStatePart({ dateState: dateState, selection: selection, isZeroPart: false }) + change * isChange;

    switch (selection.key) {
      case 'day':
        return clamp(newPartValue, 1, 31);
      case 'month':
        return clamp(newPartValue, 1, 12);
      case 'year':
        return clamp(newPartValue, MIN_YEAR, MAX_YEAR);
    }
  }

  return getDateStatePart({ dateState: dateState, selection: selection });
};

export const getNewDateStateFieldValueByKeyboard = (props: {
  key: DigitChar;
  dateState: DateStateType | DateStateRangeType;
  selection: DateInputSelectionType;
}): number => {
  const { dateState, selection, key } = props;

  if (isDigitChar(key)) {
    const newPartValue = getDateStatePart({ dateState: dateState, selection: selection }) * 10 + parseInt(key);
    switch (selection.key) {
      case 'day':
        if (newPartValue > 31) {
          return parseInt(key);
        }
        break;
      case 'month':
        if (newPartValue > 12) {
          return parseInt(key);
        }
        break;
      case 'year':
        if (newPartValue > 9999) {
          return parseInt(key);
        }
        break;
    }

    return newPartValue;
  }

  return getDateStatePart({ dateState: dateState, selection: selection });
};

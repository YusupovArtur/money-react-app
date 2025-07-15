import { DateStateType } from 'shared/inputs/DateInput/types/DateStateType.ts';
import { DateFieldName } from 'shared/inputs/DateInput/types/DateFieldName.ts';
import { MAX_YEAR, MIN_YEAR } from 'shared/inputs/DateInput/constants/constants.ts';
import { clamp } from 'shared/helpers';

const getDateStatePart = (props: { dateState: DateStateType; selectedPart: DateFieldName }): number => {
  const { dateState, selectedPart } = props;

  if (dateState[selectedPart] <= 0) {
    switch (selectedPart) {
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

  return dateState[selectedPart];
};

export const getNewDateStateFieldValue = (props: {
  key: string;
  dateState: DateStateType;
  selectedPart: DateFieldName;
}): number => {
  const { dateState, selectedPart, key } = props;

  if (key.match(/\d/g)) {
    const newPartValue = dateState[selectedPart] * 10 + parseInt(key);
    switch (selectedPart) {
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

  if (key === 'ArrowUp' || key === 'ArrowDown') {
    const change = dateState[selectedPart] ? (key === 'ArrowUp' ? 1 : key === 'ArrowDown' ? -1 : 0) : 0;
    const newPartValue = getDateStatePart({ dateState, selectedPart }) + change;

    switch (selectedPart) {
      case 'day':
        return clamp(newPartValue, 1, 31);
      case 'month':
        return clamp(newPartValue, 1, 12);
      case 'year':
        return clamp(newPartValue, MIN_YEAR, MAX_YEAR);
    }
  }

  return dateState[selectedPart];
};

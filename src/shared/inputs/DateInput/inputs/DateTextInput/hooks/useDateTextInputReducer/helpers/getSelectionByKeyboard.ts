import { DateInputSelectionType } from 'shared/inputs/DateInput/inputs/DateTextInput/hooks/useDateTextInputReducer/DateInputSelectionType.ts';

export const getSelectionByKeyboard = (props: {
  key: 'ArrowRight' | 'ArrowLeft';
  selection: DateInputSelectionType;
  type: 'date' | 'range';
}): DateInputSelectionType => {
  const { key, selection, type } = props;

  if (key === 'ArrowRight') {
    if (selection.part === 1) {
      switch (selection.key) {
        case 'day':
          return { part: 1, key: 'month' };
        case 'month':
          return { part: 1, key: 'year' };
        case 'year':
          if (type === 'range') {
            return { part: 2, key: 'day' };
          } else {
            return selection;
          }
      }
    }

    if (selection.part === 2) {
      switch (selection.key) {
        case 'day':
          return { part: 2, key: 'month' };
        case 'month':
          return { part: 2, key: 'year' };
        case 'year':
          return selection;
      }
    }
  }

  if (key === 'ArrowLeft') {
    if (selection.part === 1) {
      switch (selection.key) {
        case 'day':
          return selection;
        case 'month':
          return { part: 1, key: 'day' };
        case 'year':
          return { part: 1, key: 'month' };
      }
    }

    if (selection.part === 2) {
      switch (selection.key) {
        case 'day':
          return { part: 1, key: 'year' };
        case 'month':
          return { part: 2, key: 'day' };
        case 'year':
          return { part: 2, key: 'month' };
      }
    }
  }

  return { part: 1, key: 'day' };
};

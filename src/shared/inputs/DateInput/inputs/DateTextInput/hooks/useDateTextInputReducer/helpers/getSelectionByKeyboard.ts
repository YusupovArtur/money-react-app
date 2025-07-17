import { DateStateType } from 'shared/inputs/DateInput/types/DateStateType.ts';

export const getSelectionByKeyboard = (props: { key: string; selection: keyof DateStateType }): keyof DateStateType => {
  const { key, selection } = props;

  if (key === 'ArrowRight') {
    switch (selection) {
      case 'day':
        return 'month';
      case 'month':
        return 'year';
    }
  }

  if (key === 'ArrowLeft') {
    switch (selection) {
      case 'month':
        return 'day';
      case 'year':
        return 'month';
    }
  }

  return 'day';
};

import { DateStateType } from 'shared/inputs/DateInput/types/DateStateType.ts';

export type DateInputSelectionType = {
  part: 1 | 2;
  key: keyof DateStateType;
};

/**
 * A type representing a date with day, month, and year fields, 0 - is special invalid value.
 */
export type DateStateType = {
  day: number;
  month: number;
  year: number;
};

export type DateStateRangeType = {
  1: DateStateType;
  2: DateStateType;
};

export const isDateState = (obj: any): obj is DateStateType => {
  return (
    obj && typeof obj === 'object' && typeof obj.day === 'number' && typeof obj.month === 'number' && typeof obj.year === 'number'
  );
};

export const isDateStateRange = (obj: any): obj is DateStateRangeType => {
  return obj && typeof obj === 'object' && isDateState(obj[1]) && isDateState(obj[2]);
};

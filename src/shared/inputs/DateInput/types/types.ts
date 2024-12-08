export type DatePickerDayOptionsCellPropsType = {
  timestamp: number;
  date: number;
  isInCurrentMonth: boolean;
  isSelected: boolean;
  isCurrent: boolean;
};

export type DatePickerMonthOptionsCellPropsType = {
  month: number;
  shortName: string;
  isSelected: boolean;
  isCurrent: boolean;
};

export type DatePickerYearOptionsCellPropsType = {
  year: number;
  isSelected: boolean;
  isCurrent: boolean;
};

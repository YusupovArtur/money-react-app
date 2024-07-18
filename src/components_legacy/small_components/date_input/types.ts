export type datePickerDayCellPropsType = {
  timestamp: number;
  date: number;
  isInCurrentMonth: boolean;
  isSelected: boolean;
  isCurrent: boolean;
};

export type datePickerMonthCellPropsType = {
  monthOrder: number;
  shortName: string;
  isSelected: boolean;
  isCurrent: boolean;
};

export type datePickerYearCellPropsType = {
  year: number;
  isSelected: boolean;
  isCurrent: boolean;
};

export type dateStateType = {
  day: number;
  month: number;
  year: number;
};

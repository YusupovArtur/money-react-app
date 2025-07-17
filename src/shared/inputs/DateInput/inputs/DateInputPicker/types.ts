export type DatePickerDayCellProps = {
  timestamp: number;
  date: number;
  isInCurrentMonth: boolean;
  isSelected: boolean;
  isCurrent: boolean;
};

export type DatePickerMonthCellProps = {
  month: number;
  shortName: string;
  isSelected: boolean;
  isCurrent: boolean;
};

export type DatePickerYearCellProps = {
  year: number;
  isSelected: boolean;
  isCurrent: boolean;
};

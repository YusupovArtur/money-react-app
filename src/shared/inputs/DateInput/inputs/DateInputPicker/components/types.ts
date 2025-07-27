export type DatePickerDayCellProps = {
  timestamp: number;
  date: number;
  isInCurrentMonth: boolean;
  isSelected: boolean;
  isToday: boolean;
  isBetween: boolean;
  isLeft: boolean;
  isRight: boolean;
};

export type DatePickerMonthCellProps = {
  month: number;
  shortName: string;
  isFullSelected: boolean;
  isPartlySelected: boolean;
  isToday: boolean;

  isBetween: boolean;
  isLeft: boolean;
  isRight: boolean;
};

export type DatePickerYearCellProps = {
  year: number;
  isFullSelected: boolean;
  isPartlySelected: boolean;
  isToday: boolean;

  isBetween: boolean;
  isLeft: boolean;
  isRight: boolean;
};

export type datePickerDayCellPropsType = {
  timestamp: number;
  date: number;
  isInCurrentMonth: boolean;
  isSelected: boolean;
  isInPeriod: { isInStart: boolean; isInInterim: boolean; isInEnd: boolean };
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

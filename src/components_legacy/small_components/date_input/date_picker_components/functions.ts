import { Dispatch, SetStateAction } from 'react';
import { MIN_YEAR, MAX_YEAR } from '../constants.ts';
import { datePickerDayCellPropsType, dateStateType } from '../types.ts';
import { getTimestampFromDateState } from '../functions.ts';

export const incrementCalendar = (
  displayedField: 'day' | 'month' | 'year',
  currentMonth: number,
  currentYear: number,
  setCurrentMonth: Dispatch<SetStateAction<number>>,
  setCurrentYear: Dispatch<SetStateAction<number>>,
): void => {
  if (displayedField === 'day') {
    if (currentYear <= MAX_YEAR) {
      if (currentMonth === 11) {
        if (currentYear < MAX_YEAR) {
          setCurrentMonth(0);
          setCurrentYear((year) => year + 1);
        }
      } else setCurrentMonth((month) => month + 1);
    }
  } else if (currentYear < MAX_YEAR) setCurrentYear((year) => year + 1);
};

export const decrementCalendar = (
  displayedField: 'day' | 'month' | 'year',
  currentMonth: number,
  currentYear: number,
  setCurrentMonth: React.Dispatch<React.SetStateAction<number>>,
  setCurrentYear: React.Dispatch<React.SetStateAction<number>>,
) => {
  if (displayedField === 'day') {
    if (currentYear >= MIN_YEAR) {
      if (currentMonth === 0) {
        if (currentYear > MIN_YEAR) {
          setCurrentMonth(11);
          setCurrentYear((year) => year - 1);
        }
      } else setCurrentMonth((month) => month - 1);
    }
  } else if (currentYear > MIN_YEAR) setCurrentYear((year) => year - 1);
};

export const getDatePickerDaysField = (
  currentMonth: number,
  currentYear: number,
  dateState: dateStateType,
): datePickerDayCellPropsType[][] => {
  // const firstDayInMonth: Date = getDateObjectFromNumberDate(1, currentMonth, currentYear);
  const firstDayInMonth: Date = new Date(currentYear, currentMonth, 1);
  const firstDayInFieldTimestamp =
    firstDayInMonth.getTime() - (firstDayInMonth.getDay() === 0 ? 6 : firstDayInMonth.getDay() - 1) * 86400000;
  const datePickerDaysCellField: datePickerDayCellPropsType[][] = [];
  const timestamp = getTimestampFromDateState(dateState);
  const presentDay = new Date();
  for (let i = 0; i < 6; i++) {
    const week: datePickerDayCellPropsType[] = [];
    for (let j = 0; j < 7; j++) {
      const currentTimestamp = firstDayInFieldTimestamp + (i * 7 + j) * 86400000;
      const currentDateObject = new Date(currentTimestamp);
      week.push({
        timestamp: currentTimestamp,
        date: currentDateObject.getDate(),
        isInCurrentMonth: currentDateObject.getMonth() === currentMonth,
        isSelected: timestamp === currentTimestamp,
        isCurrent:
          presentDay.getDate() === currentDateObject.getDate() &&
          presentDay.getMonth() === currentDateObject.getMonth() &&
          presentDay.getFullYear() === currentDateObject.getFullYear(),
      });
    }
    datePickerDaysCellField.push(week);
  }
  return datePickerDaysCellField;
};

// const getDateObjectFromStringDate = (date: string): Date => {
//   return new Date(`${date.substring(6, 10)}-${date.substring(3, 5)}-${date.substring(0, 2)}T00:00:00`);
// };

// const getDateObjectFromNumberDate = (day: number, month: number, year: number): Date => {
//   return new Date(`${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T00:00:00`);
// };

// const getDateInputTimestamps = (dateInputsValue: string): { timestamp1: number; timestamp2?: number } => {
//   if (dateInputsValue.length < 11) {
//     return {
//       timestamp1: getIsDateCorrect(dateInputsValue) ? getDateObjectFromStringDate(dateInputsValue).getTime() : NaN,
//     };
//   } else {
//     return {
//       timestamp1: getIsDateCorrect(dateInputsValue.substring(0, 10))
//         ? getDateObjectFromStringDate(dateInputsValue.substring(0, 10)).getTime()
//         : NaN,
//       timestamp2: getIsDateCorrect(dateInputsValue.substring(13, 23))
//         ? getDateObjectFromStringDate(dateInputsValue.substring(13, 23)).getTime()
//         : NaN,
//     };
//   }
// };

// const checkIsDaySelected = (
//   dateInputsValue: string | { timestamp1: number; timestamp2?: number },
//   timestamp: number,
// ): boolean => {
//   if (typeof dateInputsValue === 'string') {
//     if (dateInputsValue.length < 11) return getDateObjectFromStringDate(dateInputsValue).getTime() === timestamp;
//     else
//       return (
//         getDateObjectFromStringDate(dateInputsValue.substring(0, 10)).getTime() === timestamp ||
//         getDateObjectFromStringDate(dateInputsValue.substring(13, 23)).getTime() === timestamp
//       );
//   } else {
//     if (dateInputsValue.timestamp2 === undefined) return dateInputsValue.timestamp1 === timestamp;
//     else return dateInputsValue.timestamp1 === timestamp || dateInputsValue.timestamp2 === timestamp;
//   }
// };

// const checkIsDayBeetwenSelection = (
//   dateInputsValue: string | { timestamp1: number; timestamp2?: number },
//   timestamp: number,
// ): { isInStart: boolean; isInInterim: boolean; isInEnd: boolean } => {
//   if (typeof dateInputsValue === 'string') {
//     if (dateInputsValue.length < 11) {
//       return { isInStart: false, isInInterim: false, isInEnd: false };
//     } else {
//       if (getIsDateCorrect(dateInputsValue)) {
//         const timestamp1 = getDateObjectFromStringDate(dateInputsValue.substring(0, 10)).getTime();
//         const timestamp2 = getDateObjectFromStringDate(dateInputsValue.substring(13, 23)).getTime();
//         if (timestamp === timestamp1) {
//           return { isInStart: true, isInInterim: false, isInEnd: false };
//         } else if (timestamp === timestamp2) {
//           return { isInStart: false, isInInterim: false, isInEnd: true };
//         } else if (timestamp1 < timestamp && timestamp < timestamp2) {
//           return { isInStart: false, isInInterim: true, isInEnd: false };
//         } else {
//           return { isInStart: false, isInInterim: false, isInEnd: false };
//         }
//       } else {
//         return { isInStart: false, isInInterim: false, isInEnd: false };
//       }
//     }
//   } else {
//     if (dateInputsValue.timestamp2 === undefined) {
//       return { isInStart: false, isInInterim: false, isInEnd: false };
//     } else {
//       if (timestamp === dateInputsValue.timestamp1 && dateInputsValue.timestamp2) {
//         return { isInStart: true, isInInterim: false, isInEnd: false };
//       } else if (timestamp === dateInputsValue.timestamp2) {
//         return { isInStart: false, isInInterim: false, isInEnd: true };
//       } else if (dateInputsValue.timestamp1 < timestamp && timestamp < dateInputsValue.timestamp2) {
//         return { isInStart: false, isInInterim: true, isInEnd: false };
//       } else {
//         return { isInStart: false, isInInterim: false, isInEnd: false };
//       }
//     }
//   }
// };

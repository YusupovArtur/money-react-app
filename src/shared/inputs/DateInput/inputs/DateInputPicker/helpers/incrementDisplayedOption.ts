import { DateFieldName } from 'shared/inputs/DateInput/types/DateFieldName.ts';
import { DateStateType } from 'shared/inputs/DateInput/types/DateStateType.ts';
import { Dispatch, SetStateAction } from 'react';
import { MAX_YEAR } from 'shared/inputs/DateInput/constants/constants.ts';

export const incrementDisplayedOption = (props: {
  displayedOptionType: DateFieldName;
  displayedOption: Omit<DateStateType, 'day'>;
  setDisplayedOption: Dispatch<SetStateAction<Omit<DateStateType, 'day'>>>;
}) => {
  const {
    displayedOptionType,
    displayedOption: { month, year },
    setDisplayedOption,
  } = props;

  if (displayedOptionType === 'day') {
    if (year <= MAX_YEAR) {
      if (month === 12) {
        if (year < MAX_YEAR) {
          setDisplayedOption((state) => ({ month: 1, year: state.year + 1 }));
        }
      } else {
        setDisplayedOption((state) => ({ ...state, month: state.month + 1 }));
      }
    }
  } else if (year < MAX_YEAR) {
    setDisplayedOption((state) => ({ ...state, year: state.year + 1 }));
  }
};

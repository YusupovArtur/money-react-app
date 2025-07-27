import { FC, useId } from 'react';
import { RadioButtonGroup, RadioOptions } from 'shared/inputs';
import { useDatePickerContext } from 'shared/inputs/DateInput/inputs/DateInputPicker/hooks/useDatePickerContext/useDatePickerContext.tsx';
import { DateStateRangeType, DateStateType } from 'shared/inputs/DateInput/types/DateStateType.ts';
import { TrashFillIcon } from 'shared/icons';
import { ButtonWithIcon } from 'shared/ui';
import { DateStateDispatcherAction } from 'shared/inputs/DateInput/inputs/DateInputPicker/hooks/useDateStateDispatcher/useDateStateDispatcher.ts';
import { getTimestampFromDateState } from 'shared/inputs/DateInput/helpers/getTimestampFromDateState.ts';

interface DatePickerRangeLevelMenuProps {
  dateState: DateStateRangeType;
  dateStateDispatch: (action: DateStateDispatcherAction) => void;
  isModal: boolean;
}

export const DatePickerRangeLevelMenu: FC<DatePickerRangeLevelMenuProps> = ({ dateState, dateStateDispatch, isModal }) => {
  const { state, dispatch } = useDatePickerContext();

  const options: RadioOptions<keyof DateStateType> = [
    { value: 'day', label: 'Дни', className: 'btn-outline-primary' },
    { value: 'month', label: 'Месяцы', className: 'btn-outline-primary' },
    { value: 'year', label: 'Годы', className: 'btn-outline-primary' },
  ];

  const id = useId();

  const setRangeLevel = (level: keyof DateStateType) => {
    dispatch({ type: 'setRangeLevel', payload: level });
    dispatch({
      type: 'setCalendarState',
      payload: {
        month: dateState['1'].month || dateState['2'].month || undefined,
        year: dateState['1'].year || dateState['2'].year || undefined,
      },
    });
  };

  const handleClean = () => {
    dateStateDispatch({ type: 'clear' });
  };
  const buttonDisabled = isNaN(getTimestampFromDateState(dateState[1])) && isNaN(getTimestampFromDateState(dateState[2]));

  return (
    <div className="d-flex justify-content-between mb-3">
      <input id={id} type="text" value={state.rangeLevel || ''} readOnly={true} style={{ display: 'none' }} />

      <RadioButtonGroup option={state.rangeLevel} setOption={setRangeLevel} options={options} />

      {!isModal && (
        <ButtonWithIcon onClick={handleClean} disabled={buttonDisabled} className="btn btn-primary">
          <TrashFillIcon iconSize="1rem" />
        </ButtonWithIcon>
      )}
    </div>
  );
};

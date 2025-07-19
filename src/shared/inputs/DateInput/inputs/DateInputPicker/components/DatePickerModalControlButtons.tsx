import { Dispatch, FC, SetStateAction } from 'react';
import { DateStateDispatcherAction } from 'shared/inputs/DateInput/inputs/DateInputPicker/hooks/useDateStateDispatcher/useDateStateDispatcher.ts';

interface DatePickerModalControlButtonsProps {
  dateStateDispatch: (action: DateStateDispatcherAction) => void;
  setIsOpenedDatepicker: Dispatch<SetStateAction<boolean>>;
}

export const DatePickerModalControlButtons: FC<DatePickerModalControlButtonsProps> = ({
  dateStateDispatch,
  setIsOpenedDatepicker,
}) => {
  return (
    <div className="d-flex mt-3">
      <button
        onClick={() => {
          setIsOpenedDatepicker(false);
        }}
        className="btn btn-primary flex-grow-1 me-2"
      >
        Установить
      </button>
      <button
        onClick={() => {
          dateStateDispatch({ type: 'clear' });
        }}
        className="btn btn-secondary"
      >
        Очистить
      </button>
    </div>
  );
};

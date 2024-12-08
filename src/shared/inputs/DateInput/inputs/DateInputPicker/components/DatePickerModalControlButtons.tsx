import { Dispatch, FC, SetStateAction } from 'react';
import { DateStateType } from 'shared/inputs/DateInput/types/DateStateType.ts';

interface DatePickerModalControlButtonsProps {
  setDateState: Dispatch<SetStateAction<DateStateType>>;
  setIsOpenedDatepicker: Dispatch<SetStateAction<boolean>>;
}

export const DatePickerModalControlButtons: FC<DatePickerModalControlButtonsProps> = ({
  setDateState,
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
          setDateState({ day: 0, month: 0, year: 0 });
        }}
        className="btn btn-secondary"
      >
        Очистить
      </button>
    </div>
  );
};

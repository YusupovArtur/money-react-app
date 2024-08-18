import { Dispatch, FC, SetStateAction } from 'react';
import { DateStateType } from 'shared/inputs/DateInput/types/DateStateType.ts';

interface DatePickerModalControlButtonsProps {
  setDateState: Dispatch<SetStateAction<DateStateType>>;
  setIsShowDatepicker: Dispatch<SetStateAction<boolean>>;
}

export const DatePickerModalControlButtons: FC<DatePickerModalControlButtonsProps> = ({ setDateState, setIsShowDatepicker }) => {
  return (
    <div className="d-flex mt-3">
      <button
        onClick={() => {
          setIsShowDatepicker(false);
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

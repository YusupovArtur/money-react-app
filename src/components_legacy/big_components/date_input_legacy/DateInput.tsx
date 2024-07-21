import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import DateTextInput from '../../big_components/date_input_legacy/DateTextInput';
import DateInputDatePicker from '../../big_components/date_input_legacy/DateInputDatePicker';
import { CalendarIconSvg } from '../../small_components/icons_svg/IconsSVG';
import { DATE_PICKER_CELL_SIZE } from './constants.ts';
import { getDeviceType } from './functions.ts';
import ModalContainer from 'shared/containers/ModalContainer';

const DateInput: FC<{
  dateInputValue: string;
  setDateInputValue: Dispatch<SetStateAction<string>>;
  isPeriod?: boolean;
  deviseType?: 'desktop' | 'mobile';
  zIndex?: number;
}> = ({ dateInputValue, setDateInputValue, isPeriod = false, deviseType }) => {
  // For text field
  const [isShowDatePicker, setIsShowDatePicker] = useState<boolean>(false);
  const isDeviceMobile = deviseType ? true : deviseType === undefined ? getDeviceType() === 'mobile' : false;

  useEffect(() => {
    if (isPeriod) setDateInputValue('дд.мм.гггг - дд.мм.гггг');
    else setDateInputValue('дд.мм.гггг');
  }, []);

  return (
    <div onDoubleClick={(event) => event.preventDefault()} className="input-group dropdown">
      <DateTextInput
        dateInputValue={dateInputValue}
        setDateInputValue={setDateInputValue}
        isPeriod={isPeriod}
        deviseType={deviseType}
      ></DateTextInput>
      <span
        onClick={() => {
          setIsShowDatePicker((isShowDatePicker) => !isShowDatePicker);
        }}
        className={`input-group-text btn-body-primary-unbordered dropdown-toggle ${isShowDatePicker && 'bg-primary-active'}`}
        data-bs-auto-close="false"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <CalendarIconSvg iconSize="1.3rem"></CalendarIconSvg>
      </span>
      {!isDeviceMobile && (
        <ul className="p-2 bg-body-tertiary dropdown-menu dropdown-menu-end">
          {isShowDatePicker ? (
            <DateInputDatePicker
              dateInputValue={dateInputValue}
              setDateInputValue={setDateInputValue}
              setIsShowDatepicker={setIsShowDatePicker}
              deviseType={deviseType}
            ></DateInputDatePicker>
          ) : (
            <div
              style={{
                height: `${DATE_PICKER_CELL_SIZE * 8}rem`,
                width: `${DATE_PICKER_CELL_SIZE * 7}rem`,
              }}
            ></div>
          )}
        </ul>
      )}
      <ModalContainer isOpened={isShowDatePicker && isDeviceMobile} setIsOpened={setIsShowDatePicker} style={{ margin: 'auto' }}>
        <div className="p-2 border rounded bg-body-tertiary">
          <DateInputDatePicker
            dateInputValue={dateInputValue}
            setDateInputValue={setDateInputValue}
            setIsShowDatepicker={setIsShowDatePicker}
            deviseType={deviseType}
          ></DateInputDatePicker>
        </div>
      </ModalContainer>
    </div>
  );
};

export default DateInput;

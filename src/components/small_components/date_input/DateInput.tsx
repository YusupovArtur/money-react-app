import React, { useState, useEffect } from 'react';
import DateTextInput from 'components/small_components/date_input/DateTextInput';
import DateInputDatePicker from 'components/small_components/date_input/DateInputDatePicker';
import { CalendarIconSvg } from 'components/small_components/icons_svg/IconsSVG';
import { DATE_PICKER_CELL_SIZE } from 'components/small_components/date_input/constants';
import { getDeviceType } from 'components/small_components/date_input/functions';
import ModalContainer from 'components/small_components/ModalContainer';

const DateInput: React.FC<{
  dateInputValue: string;
  setDateInputValue: React.Dispatch<React.SetStateAction<string>>;
  isPeriod?: boolean;
  deviseType?: 'desktop' | 'mobile';
  zIndex?: number;
}> = ({ dateInputValue, setDateInputValue, isPeriod = false, deviseType, zIndex }) => {
  // For text field
  const [isShowDatePicker, setIsShowDatePicker] = useState<boolean>(false);
  const isDeviceMobile = deviseType === 'mobile' ? true : deviseType === undefined ? getDeviceType() === 'mobile' : false;

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
      <ModalContainer
        isOpened={isShowDatePicker && isDeviceMobile}
        setIsOpened={setIsShowDatePicker}
        className="p-2 border rounded bg-body-tertiary"
        zIndex={zIndex}
      >
        <DateInputDatePicker
          dateInputValue={dateInputValue}
          setDateInputValue={setDateInputValue}
          setIsShowDatepicker={setIsShowDatePicker}
          deviseType={deviseType}
        ></DateInputDatePicker>
      </ModalContainer>
    </div>
  );
};

export default DateInput;

import React, { useState } from 'react';
import DateTextInput from 'components/small_components/date_input/DateTextInput';
import DateInputDatePicker from 'components/small_components/date_input/DateInputDatePicker';
import { CalendarIconSvg } from 'components/small_components/icons_svg/IconsSVG';
import { DATE_PICKER_CELL_SIZE } from 'components/small_components/date_input/constants';
import { getDeviceType } from 'components/small_components/date_input/functions';
import ModalContainer from 'components/small_components/ModalContainer';

import { dateStateType } from 'components/small_components/date_input/types';

const DateInput: React.FC<{
  dateState: dateStateType;
  setDateState: React.Dispatch<React.SetStateAction<dateStateType>>;
  setTimestampFunction?: (timestamp: number) => void;
  deviseType?: 'desktop' | 'mobile';
}> = ({ dateState, setDateState, setTimestampFunction, deviseType }) => {
  // Main variable
  // useEffect(() => {
  //   if (dateState.day && dateState.month && dateState.year && getTimestampFromDateState(dateState) !== timestamp) {
  //     setTimestamp(new Date(dateState.year, dateState.month - 1, dateState.day).getTime());
  //   }
  // }, [dateState]);
  // useEffect(() => {
  //   if ((timestamp || timestamp === 0) && timestamp !== getTimestampFromDateState(dateState)) {
  //     setDateState(getDateStateFromTimestamp(timestamp));
  //   }
  // }, [timestamp]);

  // For text field
  const [isShowDatePicker, setIsShowDatePicker] = useState<boolean>(false);
  const isDeviceMobile = deviseType === 'mobile' ? true : deviseType === undefined ? getDeviceType() === 'mobile' : false;

  return (
    <div onDoubleClick={(event) => event.preventDefault()} className="input-group dropdown">
      <DateTextInput
        dateState={dateState}
        setDateState={setDateState}
        setTimestampFunction={setTimestampFunction}
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
              dateState={dateState}
              setDateState={setDateState}
              setTimestampFunction={setTimestampFunction}
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
      <ModalContainer isOpened={isShowDatePicker && isDeviceMobile} setIsOpened={setIsShowDatePicker}>
        <div className="p-2 border rounded bg-body-tertiary">
          <DateInputDatePicker
            dateState={dateState}
            setDateState={setDateState}
            setTimestampFunction={setTimestampFunction}
            setIsShowDatepicker={setIsShowDatePicker}
            deviseType={deviseType}
          ></DateInputDatePicker>
        </div>
      </ModalContainer>
    </div>
  );
};

export default DateInput;

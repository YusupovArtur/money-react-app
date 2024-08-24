import { FC, useEffect, useState } from 'react';
// Model
import { DateStateType } from 'shared/inputs/DateInput/types/DateStateType.ts';
// Components
import { DateTextInput } from './inputs/DateTextInput/DateTextInput.tsx';
import { DateInputPicker } from 'shared/inputs/DateInput/inputs/DateInputPicker/DateInputPicker.tsx';
// Helpers
import { getDeviceType } from 'shared/helpers';
import { getDateStateFromTimestamp } from './helpers/getDateStateFromTimestamp.ts';
import { getTimestampFromDateState } from './helpers/getTimestampFromDateState.ts';
// UI
import { DropdownContainer } from 'shared/containers';
import { ButtonWithIcon, DropdownMenuWrapper } from 'shared/ui';
import { CalendarIcon } from 'shared/inputs/DateInput/ui/CalendarIcon.tsx';

interface DateInputProps {
  timestamp: number;
  setTimestamp: (timestamp: number) => any;
  isModalForMobileDevice?: boolean;
}

export const DateInput: FC<DateInputProps> = ({ timestamp, setTimestamp, isModalForMobileDevice = false }) => {
  const [dateState, setDateState] = useState<DateStateType>(getDateStateFromTimestamp(timestamp));
  const date = new Date(timestamp);

  useEffect(() => {
    setTimestamp(getTimestampFromDateState(dateState));
  }, [dateState]);

  useEffect(() => {
    setDateState((state) => {
      const dateStateTimestamp = getTimestampFromDateState(state);
      if (timestamp !== dateStateTimestamp && !(isNaN(timestamp) && isNaN(dateStateTimestamp))) {
        console.log('inner date state change', timestamp, getTimestampFromDateState(state), state);
        return getDateStateFromTimestamp(timestamp);
      }
      return state;
    });
  }, [timestamp]);

  // For text field
  const [isOpenedDatePicker, setIsOpenedDatePicker] = useState<boolean>(false);

  const isMobile = !isModalForMobileDevice ? false : getDeviceType() === 'mobile';

  return (
    <>
      <div className="d-flex">
        <DropdownContainer
          isOpened={isOpenedDatePicker}
          setIsOpened={setIsOpenedDatePicker}
          menuAlignment={{ x: 'right', y: 'top' }}
          isInsideClickClose={false}
          isModalForMobileDevice={isModalForMobileDevice}
          DropdownToggle={
            <ButtonWithIcon
              style={{ width: '100%', height: '100%' }}
              className={`btn btn-primary rounded-end-0 ${isOpenedDatePicker ? 'active' : ''}`}
            >
              <CalendarIcon iconSize="1.3rem" />
            </ButtonWithIcon>
          }
          DropdownMenu={
            <DropdownMenuWrapper>
              <DateInputPicker
                dateState={dateState}
                setDateState={setDateState}
                setIsShowDatepicker={setIsOpenedDatePicker}
                isMobile={isMobile}
              />
            </DropdownMenuWrapper>
          }
        ></DropdownContainer>
        <DateTextInput dateState={dateState} setDateState={setDateState} isMobile={isMobile} />
      </div>
      {isNaN(timestamp) ? timestamp : `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`}
    </>
  );
};

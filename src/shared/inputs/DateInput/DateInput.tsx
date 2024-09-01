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
  id?: string;
  timestamp: number;
  setTimestamp: (timestamp: number) => any;
  isModalForMobileDevice?: boolean;
  className?: string;
}

export const DateInput: FC<DateInputProps> = ({ id, timestamp, setTimestamp, isModalForMobileDevice = false, className }) => {
  const [dateState, setDateState] = useState<DateStateType>(getDateStateFromTimestamp(timestamp));

  useEffect(() => {
    setTimestamp(getTimestampFromDateState(dateState));
  }, [dateState]);

  useEffect(() => {
    setDateState((state) => {
      const dateStateTimestamp = getTimestampFromDateState(state);
      if (timestamp !== dateStateTimestamp && !(isNaN(timestamp) && isNaN(dateStateTimestamp))) {
        return getDateStateFromTimestamp(timestamp);
      }
      return state;
    });
  }, [timestamp]);

  // For text field
  const [isOpenedDatePicker, setIsOpenedDatePicker] = useState<boolean>(false);

  const isMobile = !isModalForMobileDevice ? false : getDeviceType() === 'mobile';

  return (
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
      <DateTextInput id={id} dateState={dateState} setDateState={setDateState} isMobile={isMobile} className={className} />
    </div>
  );
};

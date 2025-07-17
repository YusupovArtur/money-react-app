import React, { FC, HTMLAttributes, InputHTMLAttributes, useEffect, useRef, useState } from 'react';
// Model
import { DateStateType } from 'shared/inputs/DateInput/types/DateStateType.ts';
// Components
import { DateTextInput } from './inputs/DateTextInput/DateTextInput.tsx';
// Helpers
import { deepEqual, getDeviceType } from 'shared/helpers';
import { getDateStateFromTimestamp } from './helpers/getDateStateFromTimestamp.ts';
import { getTimestampFromDateState } from './helpers/getTimestampFromDateState.ts';
// UI
import { DropdownContainer } from 'shared/containers';
import { ButtonWithIcon, DropdownMenuWrapper } from 'shared/ui';
import { CalendarIcon } from 'shared/inputs/DateInput/ui/CalendarIcon.tsx';
import { DateInputPicker } from 'shared/inputs/DateInput/inputs/DateInputPicker/DateInputPicker.tsx';

interface DateInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'style'> {
  timestamp: number;
  setTimestamp: (timestamp: number) => any;
  disabled?: boolean;

  isModalDropdownContainerForMobileDevice?: boolean;
  portalContainerForDropdownContainer?: HTMLElement | null;
  dropdownContainerZIndex?: number;

  dateInputsDivContainersProps?: HTMLAttributes<HTMLDivElement>;
  dateTextInputProps?: Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'style' | 'disabled'> & {
    style?: Omit<React.CSSProperties, 'fontSize'> & {
      fontSize?: `${number}rem`;
    };
  };
}

export const DateInput: FC<DateInputProps> = ({
  timestamp,
  setTimestamp,
  disabled,

  isModalDropdownContainerForMobileDevice = false,
  portalContainerForDropdownContainer,
  dropdownContainerZIndex = 3,

  dateInputsDivContainersProps,
  dateTextInputProps,
}) => {
  const [dateState, setDateState] = useState<DateStateType>(getDateStateFromTimestamp(timestamp));

  const dateTextInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimestamp(getTimestampFromDateState(dateState));
  }, [dateState]);

  useEffect(() => {
    setDateState((state) => {
      const dateStateTimestamp = getTimestampFromDateState(state);
      if (!deepEqual(timestamp, dateStateTimestamp)) {
        return getDateStateFromTimestamp(timestamp);
      }
      return state;
    });
  }, [timestamp]);

  // For text field
  const [isOpenedDatePicker, setIsOpenedDatePicker] = useState<boolean>(false);

  const isMobile = !isModalDropdownContainerForMobileDevice ? false : getDeviceType() === 'mobile';

  const iconSize = dateTextInputProps?.style?.fontSize || '1.2rem';
  const { className: divClassName, ...restDivProps } = dateInputsDivContainersProps || {};

  return (
    <div className={`d-flex ${divClassName || ''}`} {...restDivProps}>
      <DropdownContainer
        isOpened={isOpenedDatePicker}
        setIsOpened={setIsOpenedDatePicker}
        disabled={disabled}
        isModalDropdownContainerForMobileDevice={isModalDropdownContainerForMobileDevice}
        portalContainer={portalContainerForDropdownContainer}
        isInsideClickClose={false}
        menuAlignment={{ x: 'right', y: 'top' }}
        zIndex={dropdownContainerZIndex}
        dropdownDivContainerProps={{ style: { width: undefined, height: undefined } }}
        additionalRefsForClickOutsideIgnore={[dateTextInputRef]}
        DropdownToggle={
          <ButtonWithIcon
            disabled={disabled}
            style={{ width: '100%', height: '100%' }}
            className={`align-self-stretch btn btn-primary rounded-end-0 ${isOpenedDatePicker ? 'active' : ''}`}
          >
            <CalendarIcon iconSize={iconSize} />
          </ButtonWithIcon>
        }
        DropdownMenu={
          <DropdownMenuWrapper>
            <DateInputPicker
              dateState={dateState}
              setDateState={setDateState}
              setIsOpenedDatepicker={setIsOpenedDatePicker}
              isModal={isMobile}
            />
          </DropdownMenuWrapper>
        }
      ></DropdownContainer>
      <DateTextInput
        dateState={dateState}
        setDateState={setDateState}
        isModal={isMobile}
        disabled={disabled}
        setIsOpenedDatePicker={setIsOpenedDatePicker}
        dateTextInputRef={dateTextInputRef}
        {...dateTextInputProps}
      />
    </div>
  );
};

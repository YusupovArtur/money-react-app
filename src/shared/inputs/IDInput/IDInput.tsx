import { ButtonHTMLAttributes, FC, useEffect, useRef, useState } from 'react';
import { DropdownContainer, IconCaptionContainer } from 'shared/containers';
import { EntityIcon } from 'entities/EntityIcon';
import { IDInputDropdown } from 'shared/inputs';

export type IDOptionType = {
  id: string;
  name: string;
  iconName: string;
  color: string;
};

interface IDInputProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  inputID?: string;
  option: IDOptionType;
  options: IDOptionType[];
  setID: (id: string) => any;
  setValidate?: () => any;
  topBorderColor?: 'success' | 'danger' | 'primary';
  selectedIconSize?: `${number}rem`;
  optionIconSize?: `${number}rem`;
  emptySelectMessage?: {
    isShow: boolean;
    caption: string;
  };
}

export const IDInput: FC<IDInputProps> = ({
  inputID,
  option,
  options,
  setID,
  setValidate,
  topBorderColor,
  selectedIconSize = '2.3rem',
  optionIconSize = '2rem',
  emptySelectMessage = { isShow: false, caption: '' },
  style,
  className,
  ...props
}) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const flag = useRef<boolean>(false);
  const flagIsWasOpened = useRef<boolean>(false);
  useEffect(() => {
    if (isOpened) {
      flagIsWasOpened.current = true;
    }
    if (flagIsWasOpened.current && !isOpened) {
      flag.current = true;
    }
    if (flag.current && !isOpened) {
      if (setValidate) {
        setValidate();
      }
    }
  }, [isOpened]);

  if (emptySelectMessage.isShow) {
    return (
      <>
        <input id={inputID} type="text" value={option.id || ''} readOnly={true} style={{ display: 'none' }} />
        <div style={{ height: `calc(${selectedIconSize} + 0.4rem)` }} className="d-flex align-items-center px-2">
          <span className="text-body-tertiary">{emptySelectMessage.caption}</span>
        </div>
      </>
    );
  }

  return (
    <>
      <input id={inputID} type="text" value={option.id || ''} readOnly={true} style={{ display: 'none' }} />

      <DropdownContainer
        isOpened={isOpened}
        setIsOpened={setIsOpened}
        menuAlignment={{ x: 'right', y: 'bottom' }}
        isModalDropdownContainerForMobileDevice={true}
        dropdownDivContainerProps={{ style: { maxWidth: '100%', maxHeight: '100%' } }}
        DropdownToggle={
          <button
            style={{ maxWidth: '100%', padding: '0.15rem 0.25rem', ...style }}
            className={`btn btn-body-tertiary ${className || ''}`}
            {...props}
          >
            <IconCaptionContainer caption={option.name} className="dropdown-toggle">
              <EntityIcon iconName={option.iconName} color={option.color} iconSize={selectedIconSize} />
            </IconCaptionContainer>
          </button>
        }
        DropdownMenu={
          <IDInputDropdown
            option={option}
            options={options}
            setID={setID}
            setValidate={setValidate}
            topBorderColor={topBorderColor}
            optionIconSize={optionIconSize}
          />
        }
      />
    </>
  );
};

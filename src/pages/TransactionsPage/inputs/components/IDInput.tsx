import { ButtonHTMLAttributes, FC, useEffect, useRef, useState } from 'react';
import { DropdownContainer, IconCaptionContainer } from 'shared/containers';
import { EntityIcon } from 'entities/EntityIcon';
import { DropdownMenuWrapper } from 'shared/ui';

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

  const topColor = topBorderColor ? `bg-${topBorderColor}` : undefined;

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
          <DropdownMenuWrapper className={`px-0 ${topColor ? 'pt-0' : ''}`} style={{ minWidth: '10rem' }}>
            {topColor && <div className={`rounded-top-2 border-bottom ${topColor}`} style={{ paddingBottom: '0.5rem' }}></div>}

            {options.map((optionListItem) => (
              <button
                key={optionListItem.id}
                onClick={() => {
                  if (setValidate) setValidate();
                  setID(optionListItem.id);
                }}
                className={`dropdown-option-list-item ${optionListItem.id === option.id ? 'active' : ''}`}
              >
                <EntityIcon iconName={optionListItem.iconName} color={optionListItem.color} iconSize={optionIconSize} />
                <span className="ms-1">{optionListItem.name}</span>
              </button>
            ))}
          </DropdownMenuWrapper>
        }
      />
    </>
  );
};

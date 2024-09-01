import { FC, useEffect, useRef, useState } from 'react';
import { DropdownContainer } from 'shared/containers';
import { EntityIcon } from 'entities/EntityIcon';
import { DropdownMenuWrapper } from 'shared/ui';

export type IDOptionType = {
  id: string;
  name: string;
  iconName: string;
  color: string;
};

interface IDInputProps {
  inputID?: string;
  option: IDOptionType;
  options: IDOptionType[];
  setID: (id: string) => any;
  setValidate?: () => any;
  topBorderColor?: 'success' | 'danger' | 'primary';
  selectedIconSize?: `${number}rem`;
  optionIconSize?: `${number}rem`;
}

export const IDInput: FC<IDInputProps> = ({
  inputID,
  option,
  options,
  setID,
  setValidate,
  topBorderColor,
  selectedIconSize = '2rem',
  optionIconSize = '2rem',
}) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const topColor = topBorderColor ? `bg-${topBorderColor}` : undefined;

  const flag = useRef<boolean>(false);
  useEffect(() => {
    if (flag.current && !isOpened) {
      if (setValidate) {
        setValidate();
      }
    }
    return () => {
      flag.current = true;
    };
  }, [isOpened]);

  return (
    <>
      <input id={inputID} type="text" value={option.id || ''} readOnly={true} style={{ display: 'none' }} />

      <DropdownContainer
        isOpened={isOpened}
        setIsOpened={setIsOpened}
        menuAlignment={{ x: 'right', y: 'bottom' }}
        isModalForMobileDevice={true}
        DropdownToggle={
          <button style={{ maxWidth: '100%' }} className="btn btn-body-tertiary d-flex align-items-center dropdown-toggle">
            <EntityIcon iconName={option.iconName} color={option.color} iconSize={selectedIconSize} />
            <span className="flex-shrink-1 text-truncate ms-1">{option.name}</span>
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

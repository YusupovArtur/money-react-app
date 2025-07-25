import { FC } from 'react';
// Dropdown
import { DropdownContainer } from 'shared/containers';
// Helpers
import { getLeveledIconNameOptions } from './helpers/getLeveledIconNameOptions.ts';
// UI
import { ButtonWithIcon, DropdownMenuWrapper } from 'shared/ui';
import { ContentIcon } from 'shared/icons';
import { IconOptionsDivider } from './ui/IconOptionsDivider.tsx';

interface IconNameInputProps {
  iconName: string;
  setIconName: (iconName: string) => any;
  iconOptions: string[][];
  id?: string;
  iconSize?: `${number}rem`;
  optionsStyle?: { rowLength?: number; isDivider?: boolean };
}

export const IconNameInput: FC<IconNameInputProps> = ({
  iconName,
  setIconName,
  iconOptions,
  id,
  iconSize = '2rem',
  optionsStyle: { rowLength = 7, isDivider = false } = {},
}) => {
  const leveledIconNameOptions = getLeveledIconNameOptions(iconOptions, rowLength);
  const optionIconSize = '2.2rem';

  const getIconGroupID = (iconsGroup: string[][]): string => {
    return 'icons_group_id' + iconsGroup.join('');
  };
  const getIconRowID = (iconsRow: string[]): string => {
    return 'icons_row_id' + iconsRow.join('');
  };

  return (
    <>
      <input id={id} type="text" value={iconName || ''} readOnly={true} style={{ display: 'none' }} />

      <DropdownContainer
        isModalDropdownContainerForMobileDevice={true}
        menuAlignment={{ x: 'right', y: 'bottom' }}
        DropdownToggle={
          <ButtonWithIcon className="dropdown-toggle btn-body-tertiary">
            <ContentIcon iconName={iconName} iconSize={iconSize} />
          </ButtonWithIcon>
        }
        DropdownMenu={
          <DropdownMenuWrapper style={{ maxHeight: '15rem' }}>
            <div style={{ overflowY: 'auto' }}>
              {leveledIconNameOptions.map((iconOptionsGroup, index) => (
                <div key={getIconGroupID(iconOptionsGroup)}>
                  {iconOptionsGroup.map((iconOptionsRow) => (
                    <div key={getIconRowID(iconOptionsRow)} className="d-flex">
                      {iconOptionsRow.map((iconNameOption) => (
                        <ButtonWithIcon
                          key={iconNameOption}
                          onClick={() => setIconName(iconNameOption)}
                          className={`dropdown-option-set-item btn-body m-1 ${iconName === iconNameOption ? 'selected' : ''} ${
                            iconNameOption === '' ? 'bordered' : ''
                          }`}
                        >
                          <ContentIcon iconName={iconNameOption} iconSize={optionIconSize} />
                        </ButtonWithIcon>
                      ))}
                    </div>
                  ))}
                  {isDivider && index < iconOptions.length - 1 && <IconOptionsDivider />}
                </div>
              ))}
            </div>
          </DropdownMenuWrapper>
        }
      />
    </>
  );
};

import { FC } from 'react';
// Dropdown
import { DropdownContainer } from 'shared/containers';
// Helpers
import { getLeveledIconNameOptions } from './helpers/getLeveledIconNameOptions.ts';
// UI
import { ButtonWithIcon, ContentIcon, DropdownMenuWrapper } from 'shared/ui';
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
        isModalForMobileDevice={true}
        menuAlignment={{ x: 'right', y: 'bottom' }}
        DropdownToggle={
          <ButtonWithIcon className="dropdown-toggle btn-body-tertiary">
            <ContentIcon iconName={iconName} iconSize={iconSize} />
          </ButtonWithIcon>
        }
        DropdownMenu={
          <DropdownMenuWrapper style={{ maxHeight: '15rem', overflowY: 'auto' }}>
            {leveledIconNameOptions.map((iconOptionsGroup, index) => (
              <div key={getIconGroupID(iconOptionsGroup)}>
                {iconOptionsGroup.map((iconOptionsRow) => (
                  <div key={getIconRowID(iconOptionsRow)} className="d-flex">
                    {iconOptionsRow.map((iconNameOption) => (
                      <ButtonWithIcon
                        key={iconNameOption}
                        onClick={() => setIconName(iconNameOption)}
                        className={`dropdown-option-item btn-body m-1 ${iconName === iconNameOption ? 'selected' : ''}`}
                      >
                        <ContentIcon iconName={iconNameOption} iconSize={optionIconSize} />
                      </ButtonWithIcon>
                    ))}
                  </div>
                ))}
                {isDivider && index < iconOptions.length - 1 && <IconOptionsDivider />}
              </div>
            ))}
          </DropdownMenuWrapper>
        }
      />
    </>
  );
};

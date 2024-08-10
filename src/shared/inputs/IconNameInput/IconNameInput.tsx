import { FC } from 'react';
// Dropdown
import { DropdownContainer } from 'shared/containers';
import { DropdownMenuWrapper } from 'shared/wrappers';
// Helpers
import { getLeveledIconNameOptions } from './helpers/getLeveledIconNameOptions.ts';
// UI
import { ButtonWithIcon, ContentIcon } from 'shared/ui';
import { IconOptionsDivider } from './ui/IconOptionsDivider.tsx';

interface IconNameInputProps {
  iconName: string;
  setIconName: (iconName: string) => void;
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
        modalForMobileDevice={true}
        menuAlignment={{ x: 'right', y: 'bottom' }}
        DropdownToggle={
          <ButtonWithIcon className="dropdown-toggle btn-body">
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
                        style={{ padding: iconName === iconNameOption ? '0.4rem' : undefined }}
                        className={`hover-scale-10 btn-body p-0 m-1 ${
                          iconName === iconNameOption ? 'selected bordered-strong' : ''
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
          </DropdownMenuWrapper>
        }
      />
    </>
  );
};

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
  iconSize?: string;
  rowLength?: number;
  isDivider?: boolean;
}

export const IconNameInput: FC<IconNameInputProps> = ({
  iconName,
  setIconName,
  iconOptions,
  iconSize = '2rem',
  rowLength = 7,
  isDivider = false,
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
    <DropdownContainer
      modalForMobileDevice={{ isEnable: true }}
      menuAlignment={{ x: 'right', y: 'bottom' }}
      DropdownToggle={
        <ButtonWithIcon className="dropdown-toggle btn-body">
          <ContentIcon iconName={iconName} iconSize={iconSize} />
        </ButtonWithIcon>
      }
      DropdownMenu={
        <DropdownMenuWrapper style={{ maxHeight: '15rem', overflowY: 'auto' }}>
          {leveledIconNameOptions.map((iconsGroup, index) => (
            <div key={getIconGroupID(iconsGroup)}>
              {iconsGroup.map((iconsRow) => (
                <div key={getIconRowID(iconsRow)} className="d-flex">
                  {iconsRow.map((icon) => (
                    <ButtonWithIcon
                      key={icon}
                      onClick={() => setIconName(icon)}
                      style={{ padding: iconName === icon ? '0.4rem' : undefined }}
                      className={`hover-scale-10 btn-body p-0 m-1 ${iconName === icon ? 'selected bordered-strong' : ''}`}
                    >
                      <ContentIcon iconName={icon} iconSize={optionIconSize} />
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
  );
};

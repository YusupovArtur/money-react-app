import { FC } from 'react';

import { ContentIcon } from 'shared/ui';
import { getLeveledIconsOptions } from './helpers/getLeveledIconsOptions.ts';

interface IconInputProps {
  iconName: string;
  iconOptions: string[][];
  setIcon: (iconName: string) => void;
  rowLength: number;
  isDivider: boolean;
}

export const IconInput: FC<IconInputProps> = ({ iconName, iconOptions, setIcon, rowLength, isDivider }) => {
  const leveledIconOptions = getLeveledIconsOptions(iconOptions, rowLength);

  return (
    <div className="dropdown">
      <button
        className="btn btn-body dropdown-toggle text-body d-flex justify-content-center align-items-center py-1 px-2"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <div className="d-flex justify-content-center align-items-center rounded-circle">
          <ContentIcon iconName={iconName} iconSize="2.4rem" />
        </div>
      </button>
      <ul className="dropdown-menu p-2">
        <div
          style={{ maxHeight: '14.65rem', overflowY: 'scroll' }}
          className="d-flex flex-column justify-content-start align-content-start"
        >
          {leveledIconOptions.map((iconsGroup, index) => (
            <div key={'icons_group_id' + iconsGroup.join('')}>
              {iconsGroup.map((iconsRow) => (
                <div key={'icons_row_id' + iconsRow.join('')}>
                  <div className="d-flex flex-nowrap">
                    {iconsRow.map((icon) => (
                      <button
                        onClick={() => setIcon(icon)}
                        key={icon}
                        className={`btn btn-body hover-scale-10 p-1 m-1 ${iconName === icon && 'bordered-strong'}`}
                      >
                        <ContentIcon iconName={icon} iconSize="1.7rem" />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              {index < iconOptions.length - 1 && isDivider && <hr className="dropdown-divider mx-1"></hr>}
            </div>
          ))}
        </div>
      </ul>
    </div>
  );
};

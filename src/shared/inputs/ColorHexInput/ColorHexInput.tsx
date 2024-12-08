import { FC } from 'react';
import { DropdownContainer } from 'shared/containers';
import { DropdownMenuWrapper } from 'shared/ui';
import { COLOR_HEX_OPTIONS } from './constants/COLOR_HEX_OPTIONS.ts';

interface ColorInputProps {
  colorHex: string;
  setColorHex: (colorHex: string) => any;
  id?: string;
  iconSize?: `${number}rem`;
}

export const ColorHexInput: FC<ColorInputProps> = ({ colorHex, setColorHex, id, iconSize = '2rem' }) => {
  const optionColorSize = '2.2rem';

  return (
    <>
      <input id={id} type="text" value={colorHex || ''} readOnly={true} style={{ display: 'none' }} />

      <DropdownContainer
        menuAlignment={{ x: 'right', y: 'bottom' }}
        isModalForMobileDevice={true}
        DropdownToggle={
          <button
            type="button"
            className="dropdown-toggle btn btn-body-tertiary d-flex justify-content-center align-items-center"
            aria-expanded="false"
          >
            <div
              style={{ backgroundColor: colorHex, width: iconSize, height: iconSize }}
              className="d-flex justify-content-center align-items-center rounded bordered"
            ></div>
          </button>
        }
        DropdownMenu={
          <DropdownMenuWrapper>
            <div style={{ overflowY: 'auto' }}>
              {COLOR_HEX_OPTIONS.map((colorOptionsRow) => (
                <div className="d-flex" key={colorOptionsRow.join('')}>
                  {colorOptionsRow.map((colorOption) => (
                    <div
                      key={colorOption}
                      onClick={() => setColorHex(colorOption)}
                      style={{ backgroundColor: colorOption, width: optionColorSize, height: optionColorSize }}
                      className={`dropdown-option-set-item bordered rounded m-1 ${colorOption === colorHex ? 'selected' : ''}`}
                    ></div>
                  ))}
                </div>
              ))}
            </div>
          </DropdownMenuWrapper>
        }
      />
    </>
  );
};

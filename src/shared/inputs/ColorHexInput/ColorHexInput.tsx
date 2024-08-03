import { FC } from 'react';
import COLOR_HEX_OPTIONS from './constants/COLOR_HEX_OPTIONS.ts';
import { DropdownContainer } from 'shared/containers';
import { DropdownMenuWrapper } from 'shared/wrappers';

interface ColorInputProps {
  colorHex: string;
  setColorHex: (colorHex: string) => void;
  iconSize?: string;
}

export const ColorHexInput: FC<ColorInputProps> = ({ colorHex, setColorHex, iconSize = '2rem' }) => {
  const optionColorSize = '2.2rem';

  return (
    <DropdownContainer
      menuAlignment={{ x: 'right', y: 'bottom' }}
      modalForMobileDevice={{ isEnable: true }}
      DropdownToggle={
        <button
          type="button"
          className="dropdown-toggle btn btn-body d-flex justify-content-center align-items-center"
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
          {COLOR_HEX_OPTIONS.map((colorsRow) => (
            <div className="d-flex" key={colorsRow.join('')}>
              {colorsRow.map((color) => (
                <div
                  key={color}
                  onClick={() => setColorHex(color)}
                  style={{ backgroundColor: color, width: optionColorSize, height: optionColorSize }}
                  className={`hover-scale-10 bordered rounded m-1 ${color === colorHex ? 'selected bordered-strong' : ''}`}
                ></div>
              ))}
            </div>
          ))}
        </DropdownMenuWrapper>
      }
    ></DropdownContainer>
  );
};

import { FC } from 'react';
import COLOR_HEX_OPTIONS from './constants/COLOR_HEX_OPTIONS.ts';
import { DropdownContainer } from 'shared/containers';
import { DropdownMenuWrapper } from 'shared/wrappers';

interface ColorInputProps {
  color: string;
  setColor: (colorHex: string) => void;
  iconSize?: string;
}

export const ColorInput: FC<ColorInputProps> = ({ color, setColor, iconSize = '2rem' }) => {
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
            style={{ backgroundColor: color, width: iconSize, height: iconSize }}
            className="d-flex justify-content-center align-items-center rounded bordered"
          ></div>
        </button>
      }
      DropdownMenu={
        <DropdownMenuWrapper>
          <div className="container text-center">
            {COLOR_HEX_OPTIONS.map((colorsRow) => (
              <div className="row d-flex flex-nowrap p-0" key={colorsRow.join('')}>
                {colorsRow.map((colorHex) => (
                  <div
                    key={colorHex}
                    className={`hover-scale-10 border rounded m-1 bordered ${color === colorHex && 'selected'}`}
                    onClick={() => setColor(colorHex)}
                    style={{ backgroundColor: colorHex, width: iconSize, height: iconSize }}
                  ></div>
                ))}
              </div>
            ))}
          </div>
        </DropdownMenuWrapper>
      }
    ></DropdownContainer>
  );
};

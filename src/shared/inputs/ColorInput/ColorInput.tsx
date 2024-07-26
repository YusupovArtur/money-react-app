import { FC } from 'react';
import colorHexOptions from './constants/colorHexOptions.ts';
import DropdownContainer from 'shared/containers/DropdownContainer';
import DropdownMenuWrapper from 'shared/wrappers/DropdownMenuWrapper';

interface ColorInputProps {
  color: string;
  setColor: (colorHex: string) => void;
  iconSize?: string;
}

const ColorInput: FC<ColorInputProps> = ({ color, setColor, iconSize = '2rem' }) => {
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
            {colorHexOptions.map((colorsRow) => (
              <div className="row d-flex flex-nowrap p-0" key={colorsRow.join('')}>
                {colorsRow.map((colorHex) => (
                  <div
                    key={colorHex}
                    className={`hover-scale-10 border rounded m-1 bordered ${color === colorHex && 'selected'}`}
                    onClick={() => setColor(colorHex)}
                    style={{ backgroundColor: colorHex, width: '2rem', height: '2rem' }}
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

export default ColorInput;

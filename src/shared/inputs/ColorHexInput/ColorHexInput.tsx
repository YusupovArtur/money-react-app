import { FC } from 'react';
import COLOR_HEX_OPTIONS from './constants/COLOR_HEX_OPTIONS.ts';
import { DropdownContainer } from 'shared/containers';
import { DropdownMenuWrapper } from 'shared/wrappers';

interface ColorInputProps {
  colorHex: string;
  setColorHex: (colorHex: string) => void;
  iconSize?: `${number}rem`;
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
          {COLOR_HEX_OPTIONS.map((colorOptionsRow) => (
            <div className="d-flex" key={colorOptionsRow.join('')}>
              {colorOptionsRow.map((colorOption) => (
                <div
                  key={colorOption}
                  onClick={() => setColorHex(colorOption)}
                  style={{ backgroundColor: colorOption, width: optionColorSize, height: optionColorSize }}
                  className={`hover-scale-10 bordered rounded m-1 ${colorOption === colorHex ? 'selected bordered-strong' : ''}`}
                ></div>
              ))}
            </div>
          ))}
        </DropdownMenuWrapper>
      }
    ></DropdownContainer>
  );
};

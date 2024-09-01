import { FC } from 'react';
import { ContentIcon } from 'shared/icons';
import { getTextColor } from './helpers/getTextColor.ts';
import { COLOR_NAMES_HEX } from 'shared/inputs/ColorHexInput/constants/COLOR_NAMES_HEX.ts';

interface EntityIconProps {
  iconName?: string;
  color?: string;
  iconSize: `${number}rem`;
}

export const EntityIcon: FC<EntityIconProps> = ({ iconName, color, iconSize }) => {
  const validatedIconName = iconName !== undefined ? iconName : 'Exclamation';
  const validatedColor = color ? color : COLOR_NAMES_HEX['red-500'];

  const numberRemSize = parseFloat(iconSize) ? parseFloat(iconSize) : 0;
  const textColor = getTextColor(validatedColor);
  const textColorClassName = textColor ? (textColor === 'light' ? 'text-light' : 'text-dark') : 'text-body';

  return (
    <div
      className={`d-flex flex-shrink-0 justify-content-center align-items-center rounded-circle ${textColorClassName}`}
      style={{
        backgroundColor: validatedColor,
        width: iconSize,
        height: iconSize,
      }}
    >
      <ContentIcon iconName={validatedIconName} iconSize={`${numberRemSize / 1.4142}rem`} />
    </div>
  );
};

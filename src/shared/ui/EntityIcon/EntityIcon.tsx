import { FC } from 'react';
import { ContentIcon } from 'shared/ui';

interface EntityIconProps {
  iconName: string;
  iconBackgroundColor: string;
  iconSize: `${number}rem`;
}

// TODO: set color as dependency from background-color
export const EntityIcon: FC<EntityIconProps> = ({ iconName, iconBackgroundColor, iconSize }) => {
  const numberRemSize = parseFloat(iconSize) ? parseFloat(iconSize) : 0;

  return (
    <div
      className="d-flex justify-content-center align-items-center rounded-circle"
      style={{
        backgroundColor: iconBackgroundColor,
        width: iconSize,
        height: iconSize,
      }}
    >
      <ContentIcon iconName={iconName} iconSize={`${numberRemSize / 1.4142}rem`} />
    </div>
  );
};

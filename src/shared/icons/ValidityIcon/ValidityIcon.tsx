import { FC } from 'react';
import { CheckIcon, ExclamationIcon } from 'shared/icons';

interface ValidityIconProps {
  isValid: boolean | undefined;
  iconSize: `${number}rem`;
}

export const ValidityIcon: FC<ValidityIconProps> = ({ isValid, iconSize }) => {
  if (isValid === undefined) {
    return null;
  }

  if (isValid) {
    return (
      <span className="d-flex align-items-center text-success">
        <CheckIcon iconSize={iconSize} />
      </span>
    );
  } else {
    return (
      <span className="d-flex align-items-center text-danger">
        <ExclamationIcon iconSize={iconSize} />
      </span>
    );
  }
};

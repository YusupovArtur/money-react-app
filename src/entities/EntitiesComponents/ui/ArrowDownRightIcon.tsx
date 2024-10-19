import { FC } from 'react';

interface ArrowDownRightIconProps {
  iconSize: `${number}rem`;
  color?: string;
}

export const ArrowDownRightIcon: FC<ArrowDownRightIconProps> = ({ iconSize, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill={color || 'currentColor'}
      className="bi bi-arrow-down-right"
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M14 13.5a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1 0-1h4.793L2.146 2.854a.5.5 0 1 1 .708-.708L13 12.293V7.5a.5.5 0 0 1 1 0z"
      />
    </svg>
  );
};

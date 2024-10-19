import { FC } from 'react';

interface ArrowUpRightIconProps {
  iconSize: `${number}rem`;
  color?: string;
}

export const ArrowUpRightIcon: FC<ArrowUpRightIconProps> = ({ iconSize, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill={color || 'currentColor'}
      className="bi bi-arrow-up-right"
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0z"
      />
    </svg>
  );
};

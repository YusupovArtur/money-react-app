import { FC } from 'react';

export const AutoThemeIcon: FC<{ iconSize: `${number}rem` }> = ({ iconSize }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="currentColor"
      className="bi bi-circle-half"
      viewBox="-2 -2 20 20"
    >
      <path d="M8 15A7 7 0 1 0 8 1zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16" />
    </svg>
  );
};

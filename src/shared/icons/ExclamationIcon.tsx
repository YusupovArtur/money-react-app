import { FC } from 'react';

export const ExclamationIcon: FC<{ iconSize: `${number}rem`; className?: string }> = ({ iconSize, className = '' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill="currentColor"
      className={`bi bi-exclamation-lg ${className}`}
      viewBox="0 0 16 16"
    >
      <path d="M7.005 3.1a1 1 0 1 1 1.99 0l-.388 6.35a.61.61 0 0 1-1.214 0zM7 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0" />
    </svg>
  );
};

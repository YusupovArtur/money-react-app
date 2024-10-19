import { FC } from 'react';

interface CashStackIconProps {
  iconSize: `${number}rem`;
  color?: string;
}

export const CashStackIcon: FC<CashStackIconProps> = ({ iconSize, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      fill={color || 'currentColor'}
      className="bi bi-cash-stack"
      viewBox="0 0 16 16"
    >
      <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
      <path d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2z" />
    </svg>
  );
};

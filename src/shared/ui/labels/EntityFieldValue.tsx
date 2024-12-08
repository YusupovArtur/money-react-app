import { FC, HTMLAttributes } from 'react';
import './text-body-unimportant.scss';

interface EntityFieldValueProps extends HTMLAttributes<HTMLSpanElement> {
  children: string;
}

export const EntityFieldValue: FC<EntityFieldValueProps> = ({ children, className, style, ...props }) => {
  return (
    <span
      className={`text-body-unimportant ${className || ''}`}
      style={{ fontSize: '1.2rem', fontWeight: 500, ...style }}
      {...props}
    >
      {children}
    </span>
  );
};

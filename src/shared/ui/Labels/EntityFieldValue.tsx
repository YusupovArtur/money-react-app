import { FC, HTMLAttributes } from 'react';

interface EntityFieldValueProps extends HTMLAttributes<HTMLSpanElement> {
  children: string;
}

export const EntityFieldValue: FC<EntityFieldValueProps> = ({ children, className, style }) => {
  return (
    <span className={`text-body ${className ? className : ''}`} style={{ fontSize: '1.2rem', fontWeight: 500, ...style }}>
      {children}
    </span>
  );
};

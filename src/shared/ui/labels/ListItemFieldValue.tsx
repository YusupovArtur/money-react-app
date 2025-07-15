import { FC, HTMLAttributes } from 'react';
import './text-body-unimportant.scss';

interface ListItemFieldValueProps extends HTMLAttributes<HTMLSpanElement> {
  children: string;
}

export const ListItemFieldValue: FC<ListItemFieldValueProps> = ({ children, style, className, ...props }) => {
  return (
    <span
      style={{
        fontSize: '1.05rem',
        whiteSpace: 'nowrap',
        maxWidth: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        ...style,
      }}
      className={`text-body-unimportant user-select-none ${className || ''}`}
      {...props}
    >
      {children}
    </span>
  );
};

import { FC, HTMLAttributes } from 'react';

interface ListItemLabelProps extends HTMLAttributes<HTMLSpanElement> {
  children: string;
}

export const ListItemLabel: FC<ListItemLabelProps> = ({ children, style, className, ...props }) => {
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
      className={`text-body user-select-none ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

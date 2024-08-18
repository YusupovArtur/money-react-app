import { FC, HTMLAttributes } from 'react';

interface EntityFieldLabelProps extends HTMLAttributes<HTMLSpanElement> {
  children: string;
}

export const EntityFieldLabel: FC<EntityFieldLabelProps> = ({ children, className, ...props }) => {
  return (
    <span className={`d-block form-label text-body user-select-none m-0 ${className ? className : ''}`} {...props}>
      {children}
    </span>
  );
};

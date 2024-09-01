import { FC, HTMLProps, ReactNode } from 'react';

interface DropdownMenuWrapperProps extends HTMLProps<HTMLDivElement> {
  children: ReactNode;
}

export const DropdownMenuWrapper: FC<DropdownMenuWrapperProps> = ({ children, style, className, ...props }) => {
  return (
    <div
      style={{ margin: '0.125rem 0', maxWidth: '100vw', ...style }}
      className={`bg-body text-body d-flex flex-column overflow-hidden border rounded-2 p-2 ${className ? className : ''}`}
      {...props}
    >
      {children}
    </div>
  );
};

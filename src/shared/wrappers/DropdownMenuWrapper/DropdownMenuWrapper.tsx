import { FC, HTMLProps, ReactNode } from 'react';

interface DropdownMenuWrapperProps extends HTMLProps<HTMLDivElement> {
  children: ReactNode;
}

const DropdownMenuWrapper: FC<DropdownMenuWrapperProps> = ({ children, className, ...props }) => {
  return (
    <div className={`bg-body text-body d-flex flex-column border rounded-2 my-1 p-2 ${className ? className : ''}`} {...props}>
      {children}
    </div>
  );
};

export default DropdownMenuWrapper;

import { FC, HTMLProps, ReactNode } from 'react';

interface ModalContainerWrapperProps extends HTMLProps<HTMLDivElement> {
  children: ReactNode;
}

const ModalContainerWrapper: FC<ModalContainerWrapperProps> = ({ children, className, ...props }) => {
  return (
    <div className={`d-flex flex-column bg-body-tertiary rounded-4 shadow-sm p-3 ${className ? className : ''}`} {...props}>
      {children}
    </div>
  );
};

export default ModalContainerWrapper;

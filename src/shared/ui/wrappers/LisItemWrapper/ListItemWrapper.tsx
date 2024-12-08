import { FC, HTMLAttributes, ReactNode } from 'react';
import './list-item-wrapper.scss';

interface ListItemWrapperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  disabled?: boolean;
  loading?: boolean;
}

export const ListItemWrapper: FC<ListItemWrapperProps> = ({ children, onClick, disabled, loading, ...props }) => {
  return (
    <div
      onClick={!disabled && !loading ? onClick : undefined}
      className={`${disabled ? 'disabled' : ''} ${loading ? 'loading' : ''} list-item-wrapper rounded px-3 py-2 mt-1`}
      {...props}
    >
      {children}
    </div>
  );
};

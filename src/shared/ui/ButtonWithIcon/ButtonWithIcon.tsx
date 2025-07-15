import { ButtonHTMLAttributes, FC, ReactNode } from 'react';

interface ButtonWithIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  caption?: string;
}

export const ButtonWithIcon: FC<ButtonWithIconProps> = ({ children, caption, className = '', ...props }) => {
  return (
    <button
      type="button"
      style={{ maxWidth: '100%' }}
      className={`btn d-flex justify-content-center align-items-center overflow-hidden ${className || ''}`}
      {...props}
    >
      {children}
      {caption && <span className={`flex-shrink-1 text-truncate ${children ? 'ms-1' : ''}`}>{caption}</span>}
    </button>
  );
};

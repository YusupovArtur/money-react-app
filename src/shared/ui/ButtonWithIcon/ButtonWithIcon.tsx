import { ButtonHTMLAttributes, FC, ReactNode } from 'react';

interface ButtonWithIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  caption?: string;
}

export const ButtonWithIcon: FC<ButtonWithIconProps> = ({ children, caption, className = '', ...props }) => {
  return (
    <button type="button" className={`${className} btn d-flex justify-content-center align-items-center`} {...props}>
      {children}
      {caption && <span className="ms-1">{caption}</span>}
    </button>
  );
};

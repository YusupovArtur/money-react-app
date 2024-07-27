import { ButtonHTMLAttributes, FC, ReactNode } from 'react';

interface ButtonWithIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  caption?: string;
}

const ButtonWithIcon: FC<ButtonWithIconProps> = ({ children, caption, className = '', ...props }) => {
  return (
    <button className={`${className} btn d-flex justify-content-between align-items-center`} {...props}>
      {children}
      {caption && <span className="ms-1">{caption}</span>}
    </button>
  );
};

export default ButtonWithIcon;

import { ButtonHTMLAttributes, FC, ReactNode } from 'react';

interface ButtonWithIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  Icon: ReactNode;
  buttonsCaption?: string;
}

const ButtonWithIcon: FC<ButtonWithIconProps> = ({ Icon, buttonsCaption, className = '', ...props }) => {
  return (
    <button className={`${className} btn d-flex justify-content-between align-items-center`} {...props}>
      {Icon}
      {buttonsCaption && <span className="ms-1">{buttonsCaption}</span>}
    </button>
  );
};

export default ButtonWithIcon;

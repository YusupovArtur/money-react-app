import { ButtonHTMLAttributes, FC, ReactNode } from 'react';

interface ButtonWithIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  Icon: ReactNode;
  text?: string;
  additionalClassNames?: string;
}

const ButtonWithIcon: FC<ButtonWithIconProps> = ({ Icon, text, additionalClassNames, ...props }) => {
  return (
    <button className={`btn btn-primary d-flex justify-content-between align-items-center ${additionalClassNames}`} {...props}>
      {Icon}
      {text && <span className="ms-1">{text}</span>}
    </button>
  );
};

export default ButtonWithIcon;

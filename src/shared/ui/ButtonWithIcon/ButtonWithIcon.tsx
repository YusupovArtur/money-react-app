import { ButtonHTMLAttributes, FC, ReactNode } from 'react';

interface ButtonWithIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  Icon: ReactNode;
  buttonsCaption?: string;
  additionalClassNames?: string;
}

const ButtonWithIcon: FC<ButtonWithIconProps> = ({ Icon, buttonsCaption, additionalClassNames, ...props }) => {
  return (
    <button className={`btn d-flex justify-content-between align-items-center ${additionalClassNames}`} {...props}>
      {Icon}
      {buttonsCaption && <span className="ms-1">{buttonsCaption}</span>}
    </button>
  );
};

export default ButtonWithIcon;

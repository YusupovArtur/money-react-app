import { ButtonHTMLAttributes, FC, ReactNode } from 'react';

interface ButtonWithIconAndSpinnerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  Icon: ReactNode;
  buttonsCaption?: string;
  isLoading?: boolean;
  spinnerSize?: string;
  spinnerThickness?: string;
}

const ButtonWithIconAndSpinner: FC<ButtonWithIconAndSpinnerProps> = ({
  Icon,
  buttonsCaption,
  isLoading,
  spinnerSize = '1.5rem',
  spinnerThickness = '0.25em',
  className = '',
  ...props
}) => {
  return (
    <button className={`${className} btn d-flex justify-content-between align-items-center`} {...props}>
      {isLoading ? (
        <div
          className="spinner-border text-light"
          style={{ width: spinnerSize, height: spinnerSize, borderWidth: spinnerThickness }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        Icon
      )}
      {buttonsCaption && <span className="ms-1">{buttonsCaption}</span>}
    </button>
  );
};

export default ButtonWithIconAndSpinner;

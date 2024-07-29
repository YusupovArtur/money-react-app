import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import { ButtonWithIcon } from 'shared/ui';

interface ButtonWithIconAndSpinnerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  caption?: string;
  isLoading?: boolean;
  spinnerSize?: string;
  spinnerThickness?: string;
}

const ButtonWithIconAndSpinner: FC<ButtonWithIconAndSpinnerProps> = ({
  children,
  isLoading,
  spinnerSize = '1.5rem',
  spinnerThickness = '0.25em',
  ...props
}) => {
  return (
    <>
      <ButtonWithIcon {...props}>
        {isLoading ? (
          <div
            className="spinner-border text-light"
            style={{ width: spinnerSize, height: spinnerSize, borderWidth: spinnerThickness }}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          children
        )}
      </ButtonWithIcon>
    </>
  );
};

export default ButtonWithIconAndSpinner;

import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import { ButtonWithIcon } from 'shared/ui';

interface ButtonWithIconAndSpinnerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  caption?: string;
  isLoading?: boolean;
  spinnerSize?: string;
  spinnerThickness?: string;
}

export const ButtonWithIconAndSpinner: FC<ButtonWithIconAndSpinnerProps> = ({
  children,
  isLoading,
  spinnerSize = '1.5rem',
  spinnerThickness = '0.25em',
  ...props
}) => {
  return (
    <>
      <ButtonWithIcon disabled={isLoading} {...props}>
        {isLoading ? (
          <div
            className="spinner-border"
            style={{
              width: spinnerSize,
              height: spinnerSize,
              borderWidth: spinnerThickness,
              color: 'inherit',
              display: 'inline-block',
              flexShrink: 0,
            }}
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

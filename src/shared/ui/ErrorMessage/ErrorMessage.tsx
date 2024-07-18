import { FC, HTMLAttributes } from 'react';

interface errorMessageProps extends HTMLAttributes<HTMLDivElement> {
  errorMessage: string;
  additionalClassNames?: string;
}

const ErrorMessage: FC<errorMessageProps> = ({ errorMessage, additionalClassNames, ...props }) => {
  const paddingY = '0.375rem';
  const paddingX = '0.75rem';

  if (!errorMessage) {
    return null;
  }
  return (
    <div
      style={{ padding: `${paddingY} ${paddingX}`, margin: 0 }}
      className={`alert d-flex justify-content-between align-items-center ${additionalClassNames}`}
      role="alert"
      {...props}
    >
      <span>{errorMessage}</span>
    </div>
  );
};

export default ErrorMessage;

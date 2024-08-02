import { FC, HTMLAttributes } from 'react';

interface AlertMessageProps extends HTMLAttributes<HTMLDivElement> {
  alertMessage: string;
}

export const AlertMessage: FC<AlertMessageProps> = ({ alertMessage, className = '', ...props }) => {
  const paddingY = '0.375rem';
  const paddingX = '0.75rem';

  if (!alertMessage) {
    return null;
  }
  return (
    <div
      style={{ padding: `${paddingY} ${paddingX}`, margin: 0 }}
      className={`${className} alert d-flex justify-content-between align-items-center`}
      role="alert"
      {...props}
    >
      <span>{alertMessage}</span>
    </div>
  );
};

import { forwardRef, InputHTMLAttributes } from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      type="text"
      style={{ fontSize: '1.08rem' }}
      className={`form-control py-1 px-2 ${className}`}
      autoComplete="off"
      {...props}
    />
  );
});

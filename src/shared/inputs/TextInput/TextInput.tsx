import { forwardRef, InputHTMLAttributes } from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({ className, style, ...props }, ref) => {
  return (
    <input
      ref={ref}
      type="text"
      style={{ fontSize: '1.08rem', ...style }}
      className={`form-control py-1 px-2 ${className || ''}`}
      autoComplete="off"
      {...props}
    />
  );
});

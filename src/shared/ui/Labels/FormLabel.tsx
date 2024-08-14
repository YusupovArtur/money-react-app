import { FC, HTMLProps } from 'react';

interface FormLabelProps extends HTMLProps<HTMLLabelElement> {
  children: string;
}

export const FormLabel: FC<FormLabelProps> = ({ children, className, ...props }) => {
  return (
    <label className={`form-label text-body user-select-none mx-1 mb-1 ${className ? className : ''}`} {...props}>
      {children}
    </label>
  );
};

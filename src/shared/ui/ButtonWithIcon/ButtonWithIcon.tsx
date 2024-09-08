import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import { IconCaptionContainer } from 'shared/containers';

interface ButtonWithIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  caption?: string;
}

export const ButtonWithIcon: FC<ButtonWithIconProps> = ({ children, caption, className = '', ...props }) => {
  return (
    <button
      type="button"
      style={{ maxWidth: '100%' }}
      className={`btn d-flex justify-content-center align-items-center ${className}`}
      {...props}
    >
      <IconCaptionContainer caption={caption}>{children}</IconCaptionContainer>
    </button>
  );
};

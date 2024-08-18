import { ButtonHTMLAttributes, Dispatch, FC, SetStateAction } from 'react';
// Store
import { useAppDispatch } from 'store';
import { signinUserWithGitHub } from 'store/slices/userSlice';
// UI
import { ButtonWithIcon } from 'shared/ui';
import { GitHubIcon } from 'pages/LoginPage/icons/GitHubIcon.tsx';

export interface SigninWithGitHubButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  setIsLoading?: Dispatch<SetStateAction<boolean>>;
  setErrorMessage?: Dispatch<SetStateAction<string>>;
  onFulfilled?: () => void;
  iconSize?: string;
}

export const SigninWithGitHubButton: FC<SigninWithGitHubButtonProps> = ({
  setIsLoading,
  setErrorMessage,
  onFulfilled,
  iconSize = '1.5rem',
  ...props
}) => {
  const dispatch = useAppDispatch();

  const handleSigninWithGitHub = () => {
    dispatch(signinUserWithGitHub({ setIsLoading, setErrorMessage, onFulfilled }));
  };

  return (
    <ButtonWithIcon onClick={handleSigninWithGitHub} caption="GitHub" {...props}>
      <GitHubIcon iconSize={iconSize} />
    </ButtonWithIcon>
  );
};

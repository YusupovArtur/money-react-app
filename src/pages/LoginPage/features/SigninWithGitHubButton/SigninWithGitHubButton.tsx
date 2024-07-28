import { ButtonHTMLAttributes, Dispatch, FC, SetStateAction } from 'react';
import ButtonWithIcon from 'shared/ui/ButtonWithIcon';
import GitHubIcon from 'pages/LoginPage/ui/GitHubIcon.tsx';
import { signinUserWithGitHub } from 'store/slices/userSlice.ts';
import { useAppDispatch } from 'store/hook.ts';

interface SigninWithGitHubButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  setIsLoading?: Dispatch<SetStateAction<boolean>>;
  setErrorMessage?: Dispatch<SetStateAction<string>>;
  onFulfilled?: () => void;
  iconSize?: string;
}

const SigninWithGitHubButton: FC<SigninWithGitHubButtonProps> = ({
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

export default SigninWithGitHubButton;

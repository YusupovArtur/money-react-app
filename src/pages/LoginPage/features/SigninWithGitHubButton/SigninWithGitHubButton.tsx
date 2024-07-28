import { ButtonHTMLAttributes, Dispatch, FC, SetStateAction } from 'react';
// Store
import { useAppDispatch } from 'store/hook.ts';
import signinUserWithGitHub from 'store/slices/userSlice/asyncThunks/signinUserWithGitHub.ts';
// UI
import ButtonWithIcon from 'shared/ui/ButtonWithIcon';
import GitHubIcon from 'pages/LoginPage/ui/GitHubIcon.tsx';

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

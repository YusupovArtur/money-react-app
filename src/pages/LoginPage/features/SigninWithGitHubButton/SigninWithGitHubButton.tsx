import { ButtonHTMLAttributes, Dispatch, FC, SetStateAction } from 'react';
import ButtonWithIcon from 'shared/ui/ButtonWithIcon';
import GitHubIcon from 'pages/LoginPage/ui/GitHubIcon.tsx';
import { signInUserWithGitHub } from 'store/slices/userSlice.ts';
import { useAppDispatch } from 'store/hook.ts';

interface SigninWithGitHubButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  setIsLoading?: Dispatch<SetStateAction<boolean>>;
  setErrorMessage?: Dispatch<SetStateAction<string>>;
  fulfilledFunction?: () => void;
  iconSize?: string;
}

const SigninWithGitHubButton: FC<SigninWithGitHubButtonProps> = ({
  setIsLoading,
  setErrorMessage,
  fulfilledFunction,
  iconSize = '1.5rem',
  ...props
}) => {
  const dispatch = useAppDispatch();

  const handleSigninWithGitHub = () => {
    dispatch(signInUserWithGitHub({ setIsLoading, setErrorMessage, fulfilledFunction }));
  };

  return (
    <ButtonWithIcon onClick={handleSigninWithGitHub} caption="GitHub" {...props}>
      <GitHubIcon iconSize={iconSize} />
    </ButtonWithIcon>
  );
};

export default SigninWithGitHubButton;
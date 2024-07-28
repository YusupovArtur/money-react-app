import { ButtonHTMLAttributes, Dispatch, FC, SetStateAction } from 'react';
import { useAppDispatch } from 'store/hook.ts';
import { signInUserWithGoogle } from 'store/slices/userSlice.ts';
import GoogleIcon from 'pages/LoginPage/ui/GoogleIcon.tsx';
import ButtonWithIcon from 'shared/ui/ButtonWithIcon';

interface SigninWithGoogleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  setIsLoading?: Dispatch<SetStateAction<boolean>>;
  setErrorMessage?: Dispatch<SetStateAction<string>>;
  onFulfilled?: () => void;
  iconSize?: string;
}

const SigninWithGoogleButton: FC<SigninWithGoogleButtonProps> = ({
  setIsLoading,
  setErrorMessage,
  onFulfilled,
  iconSize = '1.5rem',
  ...props
}) => {
  const dispatch = useAppDispatch();

  const handleSigninWithGoogle = () => {
    dispatch(signInUserWithGoogle({ setIsLoading, setErrorMessage, onFulfilled }));
  };

  return (
    <ButtonWithIcon onClick={handleSigninWithGoogle} caption="Google" {...props}>
      <GoogleIcon iconSize={iconSize} />
    </ButtonWithIcon>
  );
};

export default SigninWithGoogleButton;

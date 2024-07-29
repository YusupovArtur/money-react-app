import { ButtonHTMLAttributes, Dispatch, FC, SetStateAction } from 'react';
// Store
import { useAppDispatch } from 'store/hook';
import { signinUserWithGoogle } from 'store/slices/userSlice';
// UI
import { ButtonWithIcon } from 'shared/ui';
import GoogleIcon from 'pages/LoginPage/icons/GoogleIcon';

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
    dispatch(signinUserWithGoogle({ setIsLoading, setErrorMessage, onFulfilled }));
  };

  return (
    <ButtonWithIcon onClick={handleSigninWithGoogle} caption="Google" {...props}>
      <GoogleIcon iconSize={iconSize} />
    </ButtonWithIcon>
  );
};

export default SigninWithGoogleButton;

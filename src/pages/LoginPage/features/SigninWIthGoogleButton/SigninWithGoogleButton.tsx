import { ButtonHTMLAttributes, Dispatch, FC, SetStateAction } from 'react';
// Store
import { useAppDispatch } from 'store';
import { signinUserWithGoogle } from 'store/slices/userSlice';
// UI
import { ButtonWithIcon } from 'shared/ui';
import { GoogleIcon } from 'pages/LoginPage/icons/GoogleIcon.tsx';

interface SigninWithGoogleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  setIsLoading?: Dispatch<SetStateAction<boolean>>;
  setErrorMessage?: Dispatch<SetStateAction<string>>;
  onFulfilled?: () => any;
  iconSize?: string;
}

export const SigninWithGoogleButton: FC<SigninWithGoogleButtonProps> = ({
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

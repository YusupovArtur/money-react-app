import { Dispatch, FC, SetStateAction } from 'react';
import { useAppDispatch } from 'store/hook.ts';
import { signInUserWithGitHub } from 'store/slices/userSlice.ts';
import SigninWithGoogleButton from 'pages/LoginPage/features/SigninWIthGoogleButton/SigninWithGoogleButton.tsx';
import SigninWithGitHubButton from 'pages/LoginPage/features/SigninWithGitHubButton';

interface SignInWithPopupButtonsProps {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setErrorMessage: Dispatch<SetStateAction<string>>;
  fulfilledFunction: () => void;
}

const SignInWithPopupButtons: FC<SignInWithPopupButtonsProps> = ({
  isLoading,
  setIsLoading,
  setErrorMessage,
  fulfilledFunction,
}) => {
  const dispatch = useAppDispatch();

  const iconSize: string = '1.5rem';

  const handleSignInWithGitHub = () => {
    dispatch(signInUserWithGitHub({ setIsLoading, setErrorMessage, fulfilledFunction }));
  };

  return (
    <div className={`mt-2 ${isLoading && 'd-none'}`}>
      <div className="d-flex max-width-form flex-wrap justify-content-evenly">
        <SigninWithGoogleButton
          setIsLoading={setIsLoading}
          setErrorMessage={setErrorMessage}
          fulfilledFunction={fulfilledFunction}
          className="btn-body"
          iconSize={iconSize}
        />
        <SigninWithGitHubButton
          setIsLoading={setIsLoading}
          setErrorMessage={setErrorMessage}
          fulfilledFunction={fulfilledFunction}
          className="btn-body"
          iconSize={iconSize}
        />
      </div>
    </div>
  );
};

export default SignInWithPopupButtons;

import { Dispatch, FC, SetStateAction } from 'react';
import SigninWithGoogleButton from 'pages/LoginPage/features/SigninWIthGoogleButton/SigninWithGoogleButton';
import SigninWithGitHubButton from 'pages/LoginPage/features/SigninWithGitHubButton/SigninWithGitHubButton';

interface SigninWithPopupButtonsProps {
  setIsLoading?: Dispatch<SetStateAction<boolean>>;
  setErrorMessage?: Dispatch<SetStateAction<string>>;
  onFulfilled?: () => void;
  iconSize?: string;
}

const SigninWithPopupButtons: FC<SigninWithPopupButtonsProps> = ({ setIsLoading, setErrorMessage, onFulfilled, iconSize }) => {
  return (
    <div className="mt-3">
      <p className="form-label text-body user-select-none mb-1">Войти с помощью:</p>
      <div className="d-flex justify-content-evenly">
        <SigninWithGoogleButton
          className="btn-body"
          setIsLoading={setIsLoading}
          setErrorMessage={setErrorMessage}
          onFulfilled={onFulfilled}
          iconSize={iconSize}
        />
        <SigninWithGitHubButton
          className="btn-body"
          setIsLoading={setIsLoading}
          setErrorMessage={setErrorMessage}
          onFulfilled={onFulfilled}
          iconSize={iconSize}
        />
      </div>
    </div>
  );
};

export default SigninWithPopupButtons;

import { Dispatch, FC, SetStateAction } from 'react';
import { SigninWithGitHubButton } from '../SigninWithGitHubButton/SigninWithGitHubButton.tsx';
import { SigninWithGoogleButton } from '../SigninWIthGoogleButton/SigninWithGoogleButton.tsx';

interface SigninWithPopupButtonsProps {
  setIsLoading?: Dispatch<SetStateAction<boolean>>;
  setErrorMessage?: Dispatch<SetStateAction<string>>;
  onFulfilled?: () => any;
  iconSize?: string;
}

export const SigninWithPopupButtons: FC<SigninWithPopupButtonsProps> = ({
  setIsLoading,
  setErrorMessage,
  onFulfilled,
  iconSize,
}) => {
  return (
    <div className="mt-3">
      <p className="form-label text-body user-select-none mb-1">Войти с помощью:</p>
      <div className="d-flex justify-content-evenly">
        <SigninWithGoogleButton
          className="btn-body-tertiary"
          setIsLoading={setIsLoading}
          setErrorMessage={setErrorMessage}
          onFulfilled={onFulfilled}
          iconSize={iconSize}
        />
        <SigninWithGitHubButton
          className="btn-body-tertiary"
          setIsLoading={setIsLoading}
          setErrorMessage={setErrorMessage}
          onFulfilled={onFulfilled}
          iconSize={iconSize}
        />
      </div>
    </div>
  );
};

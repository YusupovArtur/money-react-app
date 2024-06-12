import React from 'react';
import { useAppDispatch } from 'store/hook.ts';
import { signInUserWithGitHub, signInUserWithGoogle } from 'store/slices/userSlice.ts';
import { GoogleIconSVG, GithubIconSVG } from 'components/small_components/icons_svg/IconsSVG';

interface SignInWithPopupButtonsProps {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  isOk: React.MutableRefObject<boolean>;
}

const SignInWithPopupButtons: React.FC<SignInWithPopupButtonsProps> = (props) => {
  const { isLoading, setIsLoading, setErrorMessage, isOk } = props;
  const dispatch = useAppDispatch();

  const iconSize: string = '1.8rem';

  const handleSignInWithGoogle = () => {
    dispatch(
      signInUserWithGoogle({
        setIsLoading: setIsLoading,
        setErrorMessage: setErrorMessage,
        isOk: isOk,
      }),
    );
  };
  const handleSignInWithGitHub = () => {
    dispatch(
      signInUserWithGitHub({
        setIsLoading: setIsLoading,
        setErrorMessage: setErrorMessage,
        isOk: isOk,
      }),
    );
  };

  return (
    <div className={`${isLoading && 'd-none'}`}>
      <div style={{ maxWidth: '27rem', width: '90vw' }} className="d-flex max-width-form flex-wrap justify-content-evenly">
        <button onClick={handleSignInWithGoogle} type="button" className="btn btn-body shadow-sm rounded-4 px-3 py-2 mt-2">
          <span className="me-2">Войти с</span>
          <GoogleIconSVG iconSize={iconSize}></GoogleIconSVG>
        </button>
        <button onClick={handleSignInWithGitHub} type="button" className="btn btn-body shadow-sm rounded-4 px-3 py-2 mt-2">
          <span className="me-2">Войти с</span>
          <GithubIconSVG iconSize={iconSize}></GithubIconSVG>
        </button>
      </div>
    </div>
  );
};

export default SignInWithPopupButtons;

import { FC, useState } from 'react';
// Store
import { useAppDispatch, useAppSelector } from 'store';
import { signinUserWithEmailAndPassword, signupUserWithEmailAndPassword } from 'store/slices/userSlice';
// Router
import { Navigate, useNavigate } from 'react-router-dom';
// Forms
import { SigninForm } from './forms/SigninForm/SigninForm';
import { SignupForm } from './forms/SignupForm/SignupForm';
import { SigninFormDataType } from './types/SigninFormDataType';
// Features
import { SigninWithPopupButtons } from './features/SigninWithPopupButtons/SigninWithPopupButtons';
// UI
import { AlertMessage, PageContentWrapper, PageLoadingSpinner } from 'shared/ui';
import { SignupFormDataType } from './types/SignupFormDataType';

export const LoginPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isAuthorised = useAppSelector((state) => state.user.userState.isUserAuthorised);
  const [page, setPage] = useState<'signin' | 'signup'>('signin');

  const [signinFormData, setSigninFormData] = useState<SigninFormDataType>({ email: '', password: '' });
  const [signupFormData, setSignupFormData] = useState<SignupFormDataType>({
    email: '',
    username: '',
    password: '',
    password2: '',
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const onFulfilled = () => {
    navigate('/');
  };

  const handleSignin = () => {
    dispatch(
      signinUserWithEmailAndPassword({
        email: signinFormData.email,
        password: signinFormData.password,
        setIsLoading: setIsLoading,
        setErrorMessage: setErrorMessage,
        onFulfilled: onFulfilled,
      }),
    );
  };

  const handleSignup = () => {
    dispatch(
      signupUserWithEmailAndPassword({
        email: signupFormData.email,
        password: signupFormData.password,
        username: signupFormData.username,
        setIsLoading: setIsLoading,
        setErrorMessage: setErrorMessage,
        onFulfilled: onFulfilled,
      }),
    );
  };

  const handleLink = () => {
    setPage((state) => {
      if (state === 'signin') {
        return 'signup';
      } else {
        return 'signin';
      }
    });
  };

  if (isAuthorised) {
    return <Navigate to="/profile" />;
  }

  if (isLoading) {
    return <PageLoadingSpinner />;
  }

  return (
    <PageContentWrapper style={{ margin: 'auto', maxWidth: '25rem' }}>
      {page === 'signin' ? (
        <SigninForm formData={signinFormData} setFormData={setSigninFormData} onSubmit={handleSignin} />
      ) : (
        <SignupForm formData={signupFormData} setFormData={setSignupFormData} onSubmit={handleSignup} />
      )}

      <button onClick={handleLink} className="btn btn-link align-self-center" style={{ cursor: 'pointer' }}>
        {page === 'signup' ? '←Войти' : 'Зарегистрироваться→'}
      </button>

      <SigninWithPopupButtons setIsLoading={setIsLoading} setErrorMessage={setErrorMessage} onFulfilled={onFulfilled} />
      <AlertMessage alertMessage={errorMessage} className="alert-danger mt-2" />
    </PageContentWrapper>
  );
};

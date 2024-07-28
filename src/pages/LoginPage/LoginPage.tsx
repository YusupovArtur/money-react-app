import { FC, useState } from 'react';
// Store
import { useAppDispatch, useAppSelector } from 'store/hook.ts';
import { signInUserWithEmailAndPassword } from 'store/slices/userSlice.ts';
// Router
import { Navigate } from 'react-router-dom';
// Forms
import SigninForm from './forms/SigninForm';
import SigninFormDataType from './types/SigninFormDataType.ts';
// Features
import SignInWithPopupButtons from './features/SigninWithPopupButtons';
// UI
import AlertMessage from 'shared/ui/AlertMessage';
import PageLoadingSpinner from 'shared/ui/PageLoadingSpinner';
import PageContentWrapper from 'shared/wrappers/PageContentWrapper';
import SignupForm from './forms/SignupForm';
import SignupFormDataType from './types/SignupFormDataType.ts';

const LoginPage: FC = () => {
  const dispatch = useAppDispatch();

  const isAuthorised = useAppSelector((state) => state.user.userState.isUserAuthorised);
  const [page, setPage] = useState<'signin' | 'signup'>('signin');

  const [signinFormData, setSigninFormData] = useState<SigninFormDataType>({ email: '', password: '' });
  const [signupFormData, setSignupFormData] = useState<SignupFormDataType>({
    email: '',
    password1: '',
    password2: '',
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSignin = () => {
    dispatch(
      signInUserWithEmailAndPassword({
        email: signinFormData.email,
        password: signinFormData.password,
        setIsLoading,
        setErrorMessage,
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
        <SignupForm formData={signupFormData} setFormData={setSignupFormData} />
      )}

      <a onClick={handleLink} className="link align-self-center user-select-none mt-1" style={{ cursor: 'pointer' }}>
        {page === 'signup' ? '←Войти' : 'Зарегистрироваться→'}
      </a>

      <SignInWithPopupButtons setIsLoading={setIsLoading} setErrorMessage={setErrorMessage} />
      <AlertMessage alertMessage={errorMessage} className="alert-danger mt-2" />
    </PageContentWrapper>
  );
};
export default LoginPage;

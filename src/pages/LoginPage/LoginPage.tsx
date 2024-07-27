import { FC, useState } from 'react';
import { useAppSelector } from 'store/hook.ts';
import PageLoadingSpinner from 'shared/ui/PageLoadingSpinner';
import SigninForm from 'pages/LoginPage/forms/SigninForm/SigninForm.tsx';
import PageContentWrapper from 'shared/wrappers/PageContentWrapper';
import { Navigate } from 'react-router-dom';

const LoginPage: FC = () => {
  const isAuthorised = useAppSelector((state) => state.user.userState.isUserAuthorised);
  const [regime, setRegime] = useState<'signin' | 'signup'>('signin');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  if (false && isAuthorised) {
    return <Navigate to="/profile" />;
  }

  if (isLoading) {
    return <PageLoadingSpinner />;
  }

  return (
    <PageContentWrapper style={{ margin: 'auto', maxWidth: '27rem' }}>
      <SigninForm></SigninForm>
    </PageContentWrapper>
  );
};

export default LoginPage;

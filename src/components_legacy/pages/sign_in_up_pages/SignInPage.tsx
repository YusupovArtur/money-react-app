import { FC, useState } from 'react';
// Router
import { Link, useNavigate } from 'react-router-dom';
// Store
import { useAppDispatch, useAppSelector } from 'store/hook.ts';
import { setIsRemember, signInUserWithEmailAndPassword } from 'store/slices/userSlice.ts';
import SignInWithPopupButtons from '../../pages/sign_in_up_pages/SignInWithPopupButtons';
import isEmailFormatCorrect from 'pages/LoginPage/helpers/isEmailFormatCorrect.ts';
// UI
import PageLoadingSpinner from 'shared/ui/PageLoadingSpinner';
import PageContentWrapper from 'shared/wrappers/PageContentWrapper';

const SignInPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isShouldRemember: boolean = useAppSelector((state) => state.user.isShouldRemember);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const fulfilledFunction = () => navigate('/');

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSignIn = () => {
    if (!email) setErrorMessage('Поле электронной почты пусто');
    else if (!password) setErrorMessage('Поле пароля пусто');
    else if (!isEmailFormatCorrect(email)) setErrorMessage('Неверный формат электронной почты');
    else {
      setErrorMessage('');
      dispatch(signInUserWithEmailAndPassword({ email, password, setIsLoading, setErrorMessage, fulfilledFunction }));
    }
  };

  if (isLoading) return <PageLoadingSpinner />;

  return (
    <PageContentWrapper style={{ margin: 'auto', maxWidth: '27rem' }}>
      <form>
        <div className="mb-3">
          <label htmlFor="loginLogin" className="form-label text-body user-select-none">
            Электронная почта
          </label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="form-control"
            id="loginLogin"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="loginPassword" className="form-label text-body user-select-none">
            Пароль
          </label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="form-control"
            id="loginPassword"
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            checked={isShouldRemember}
            onChange={(event) => dispatch(setIsRemember(event.target.checked))}
            className="form-check-input"
            id="loginCheck"
          />
          <label className="form-check-label text-body user-select-none" htmlFor="loginCheck">
            Запомнить меня
          </label>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <button onClick={handleSignIn} type="button" className="btn btn-primary px-4">
            Войти
          </button>
          <Link
            className="link-body-emphasis link-offset-2 link-underline-opacity-75 link-underline-opacity-50-hover me-1"
            to={'/signup'}
          >
            Зарегистрироваться
          </Link>
        </div>
      </form>
      {errorMessage && (
        <div className={'alert alert-warning mt-3 mb-0 p-2'} role="alert">
          {errorMessage}
        </div>
      )}

      <SignInWithPopupButtons
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setErrorMessage={setErrorMessage}
        fulfilledFunction={fulfilledFunction}
      />
    </PageContentWrapper>
  );
};

export default SignInPage;

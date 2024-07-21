import { FC, useState } from 'react';
// Router
import { Link, useNavigate } from 'react-router-dom';
// Store
import { useAppDispatch, useAppSelector } from 'store/hook.ts';
import { setIsRemember, signInUserWithEmailAndPassword } from 'store/slices/userSlice.ts';
import SignInWithPopupButtons from '../../pages/sign_in_up_pages/SignInWithPopupButtons';
import { isEmailCorrect } from './functions.ts';
// UI
import PageLoadingSpinner from 'shared/ui/PageLoadingSpinner';

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
    else if (!isEmailCorrect(email)) setErrorMessage('Неверный формат электронной почты');
    else {
      setErrorMessage('');
      dispatch(signInUserWithEmailAndPassword({ email, password, setIsLoading, setErrorMessage, fulfilledFunction }));
    }
  };

  if (isLoading) return <PageLoadingSpinner></PageLoadingSpinner>;

  return (
    <div>
      <div style={{ maxWidth: '27rem', width: '90vw' }} className="bg-body-tertiary shadow-sm p-3 rounded-4 container-sm">
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
      </div>

      <SignInWithPopupButtons
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setErrorMessage={setErrorMessage}
        fulfilledFunction={fulfilledFunction}
      ></SignInWithPopupButtons>
    </div>
  );
};

export default SignInPage;

import { FC, useState } from 'react';
// Router
import { Link, useNavigate } from 'react-router-dom';
// Store
import { useAppDispatch, useAppSelector } from 'store/hook.ts';
import { setIsRemember, signUpUserWithEmailAndPassword, updateUserName } from 'store/slices/userSlice.ts';
import SignInWithPopupButtons from '../../pages/sign_in_up_pages/SignInWithPopupButtons';
import isEmailFormatCorrect from 'pages/LoginPage/helpers/isEmailFormatCorrect.ts';
// UI
import PageLoadingSpinner from 'shared/ui/PageLoadingSpinner';
import PageContentWrapper from 'shared/wrappers/PageContentWrapper';

const SignUpPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isShouldRemember: boolean = useAppSelector((state) => state.user.isShouldRemember);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const fulfilledFunction = () => {
    if (userName) dispatch(updateUserName({ userName }));
    navigate('/');
  };

  const [email, setEmail] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [password1, setPassword1] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');

  const handleSignUp = () => {
    if (!email) setErrorMessage('Поле электронной почты пусто');
    else if (!isEmailFormatCorrect(email)) setErrorMessage('Неверный формат электронной почты');
    else if (!password1) setErrorMessage('Поле пароля пусто');
    else if (password1 !== password2) setErrorMessage('Пароли не совпадают');
    else {
      setErrorMessage('');
      dispatch(
        signUpUserWithEmailAndPassword({
          email,
          password: password1,
          setIsLoading,
          setErrorMessage,
          fulfilledFunction,
        }),
      );
    }
  };

  if (isLoading) return <PageLoadingSpinner />;

  return (
    <PageContentWrapper style={{ margin: 'auto', maxWidth: '27rem' }}>
      <form>
        <div className="mb-3">
          <label htmlFor="registrationEmail" className="form-label text-body user-select-none">
            Электронная почта
          </label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="form-control"
            id="registrationEmail"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="registrationUser" className="form-label text-body user-select-none">
            Имя
          </label>
          <input
            type="text"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
            className="form-control"
            id="registrationUser"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="registrationPassword1" className="form-label text-body user-select-none">
            Пароль
          </label>
          <input
            type="password"
            value={password1}
            onChange={(event) => setPassword1(event.target.value)}
            className="form-control"
            id="registrationPassword1"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="registrationPassword2" className="form-label text-body user-select-none">
            Повторите пароль
          </label>
          <input
            type="password"
            value={password2}
            onChange={(event) => setPassword2(event.target.value)}
            className="form-control"
            id="registrationPassword2"
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
          <button onClick={handleSignUp} type="button" className="btn btn-primary px-4">
            Зарегистрироваться
          </button>
          <Link
            className="link-body-emphasis link-offset-2 link-underline-opacity-75 link-underline-opacity-50-hover me-1"
            to={'/signin'}
          >
            Войти
          </Link>
        </div>
      </form>
      {errorMessage && (
        <div className="alert alert-warning mt-3 mb-0 p-2" role="alert">
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

export default SignUpPage;

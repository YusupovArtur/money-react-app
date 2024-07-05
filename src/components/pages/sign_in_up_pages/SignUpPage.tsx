import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hook.ts';
import { signUpUserWithEmailAndPassword, updateUserName, setIsRemember } from 'store/slices/userSlice.ts';
import SignInWithPopupButtons from 'components/pages/sign_in_up_pages/SignInWithPopupButtons';
import { isEmailCorrect } from 'components/pages/sign_in_up_pages/functions';

function SignUpPage(): React.ReactElement {
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
    else if (!password1) setErrorMessage('Поле пароля пусто');
    else if (password1 !== password2) setErrorMessage('Пароли не совпадают');
    else if (!isEmailCorrect(email)) setErrorMessage('Неверный формат электронной почты');
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

  if (isLoading)
    return (
      <div className="spinner-border text-body loading-spinner" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );

  return (
    <div>
      <div style={{ maxWidth: '27rem', width: '90vw' }} className="bg-body-tertiary shadow-sm p-3 rounded-4 container-sm">
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
      </div>
      <SignInWithPopupButtons
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setErrorMessage={setErrorMessage}
        fulfilledFunction={fulfilledFunction}
      ></SignInWithPopupButtons>
    </div>
  );
}

export default SignUpPage;

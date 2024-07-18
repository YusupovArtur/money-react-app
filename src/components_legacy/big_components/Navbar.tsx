import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from 'store/hook.ts';
import ThemeToggle from '../small_components/ThemeToggle';

const Navbar: FC = () => {
  const location = useLocation();

  const isUserAuthorised = useAppSelector((state) => state.user.userState.isUserAuthorised);

  const photoURL = useAppSelector((state) => state.user.userState.photoURL);
  const theme = useAppSelector((state) => state.theme.themeDisplay);

  return (
    <nav className="sticky-top z-1 navbar navbar-expand-md bg-body-tertiary shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex justify-content-center" to={'/'}>
          <img style={{ width: '1.7rem', height: '1.7rem' }} src="./images/icon_chart2.png" alt="2Money" />
        </Link>

        <button
          type="button"
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <Link to={'/'} className={`nav-link ${location.pathname === '/' && 'active'}`}>
                Главная
              </Link>
            </li>
            <li className="nav-item">
              <Link to={'/transactions'} className={`nav-link ${location.pathname === '/transactions' && 'active'}`}>
                Транзакции
              </Link>
            </li>
            <li className="nav-item">
              <Link to={'/wallets'} className={`nav-link ${location.pathname === '/wallets' && 'active'}`}>
                Счета
              </Link>
            </li>
            <li className="nav-item">
              <Link to={'/categories'} className={`nav-link ${location.pathname === '/categories' && 'active'}`}>
                Категории
              </Link>
            </li>
            {isUserAuthorised ? (
              <li className="nav-item d-flex align-items-center">
                <Link
                  to={'/profile'}
                  className={`nav-link ${
                    (location.pathname === '/signin' || location.pathname === '/signup' || location.pathname === '/profile') &&
                    'active'
                  }`}
                >
                  <div className="d-flex align-items-center">
                    Профиль
                    <img
                      style={{ width: '1.5rem', height: '1.5rem', objectFit: 'contain' }}
                      className="rounded-circle ms-1"
                      src={photoURL ? photoURL : `./images/person-circle-${theme}.svg`}
                      alt="Нет фото"
                    />
                  </div>
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link
                  to={'/signin'}
                  className={`nav-link ${
                    (location.pathname === '/signin' || location.pathname === '/signup' || location.pathname === '/profile') &&
                    'active'
                  }`}
                >
                  Войти
                </Link>
              </li>
            )}
          </ul>
          <ThemeToggle></ThemeToggle>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import { FC } from 'react';
// Router
import { Link } from 'react-router-dom';
// Store
import { useAppSelector } from 'store';
// UI
import { ThemeToggle } from 'features/ThemeToggle';
import { UserPhoto } from 'entities/UserPhoto';
import { NavbarLink } from 'widgets/Navbar/ui/NavbarLink.tsx';
import { CategoryIcon, WalletIcon } from 'shared/icons';
import { IconCaptionContainer } from 'shared/containers';
import { useMediaQuery } from 'shared/hooks';
import { BoxArrowInRightIcon } from 'widgets/Navbar/icons/BoxArrowInRightIcon.tsx';

export const Navbar: FC = () => {
  const isAuthorised = useAppSelector((state) => state.user.userState.isUserAuthorised);
  const isMobile = useMediaQuery('(max-width: 550px)');

  const userLinkCaption = isAuthorised ? 'Профиль' : 'Войти';
  const UserLinkIcon = isAuthorised ? <UserPhoto iconSize="1.4rem" /> : <BoxArrowInRightIcon iconSize="1.4rem" />;

  return (
    <nav className="sticky-top navbar bg-body-tertiary shadow-sm z-2">
      <div className="container-fluid flex-nowrap">
        <Link className="navbar-brand d-flex align-items-center p-0 m-0 me-2" to="/">
          <img style={{ width: '1.8rem', height: '1.8rem' }} src="/images/chart-icon.png" alt="2Money" />
        </Link>

        <NavbarLink to={'/'} className="me-2">
          <span>Главная</span>
        </NavbarLink>
        <NavbarLink to={'/transactions'} className="me-2">
          <span>Транзакции</span>
        </NavbarLink>
        <NavbarLink to={'/wallets'} className="me-2">
          <IconCaptionContainer caption={!isMobile ? 'Счета' : undefined}>
            {isMobile && (
              <div className="mx-2">
                <WalletIcon iconSize="1.4rem"></WalletIcon>
              </div>
            )}
          </IconCaptionContainer>
        </NavbarLink>
        <NavbarLink to={'/categories'} className="me-2">
          <IconCaptionContainer caption={!isMobile ? 'Категории' : undefined}>
            {isMobile && (
              <div className="me-2">
                <CategoryIcon iconSize="1.4rem"></CategoryIcon>
              </div>
            )}
          </IconCaptionContainer>
        </NavbarLink>
        <NavbarLink to={isAuthorised ? '/profile' : '/login'} className="me-2">
          <IconCaptionContainer caption={!isMobile ? userLinkCaption : undefined}>{UserLinkIcon}</IconCaptionContainer>
        </NavbarLink>

        <div style={{ marginLeft: 'auto' }}>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

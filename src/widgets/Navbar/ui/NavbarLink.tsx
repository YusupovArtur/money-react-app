import { FC } from 'react';
import { Link, LinkProps, useLocation } from 'react-router-dom';
import './navbar-link.scss';

export const NavbarLink: FC<LinkProps> = ({ to, children, className, ...props }) => {
  const location = useLocation();

  return (
    <Link to={to} className={`navbar-link overflow-hidden ${className} ${location.pathname === to ? 'active' : ''}`} {...props}>
      {children}
    </Link>
  );
};

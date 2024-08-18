import { FC } from 'react';
// Store
import { useAppSelector } from 'store';
// Router
import { Navigate } from 'react-router-dom';
// Features
import { UserLogoutButton } from './features/UserLogoutButton/UserLogoutButton';
import { UsernameEditForm } from './features/UsernameEditForm/UsernameEditForm';
import { UserPhotoEditForm } from './features/UserPhotoChangeButton/UserPhotoEditForm.tsx';
import { UserPhoto } from 'entities/UserPhoto';
import { PageContentWrapper } from 'shared/ui';

export const ProfilePage: FC = () => {
  const isAuthorised = useAppSelector((state) => state.user.userState.isUserAuthorised);

  if (!isAuthorised) {
    return <Navigate to="/login" />;
  }

  return (
    <PageContentWrapper style={{ margin: 'auto', maxWidth: '25rem' }}>
      <UserPhoto iconSize="12rem" className="align-self-center" />
      <UserPhotoEditForm />
      <UsernameEditForm />
      <UserLogoutButton className="btn-danger align-self-center" iconSize="1.5rem" />
    </PageContentWrapper>
  );
};

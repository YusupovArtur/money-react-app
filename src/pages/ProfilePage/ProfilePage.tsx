import { FC } from 'react';
// Store
import { useAppSelector } from 'store/hook';
// Router
import { Navigate } from 'react-router-dom';
// Features
import UserLogoutButton from 'pages/ProfilePage/features/UserLogoutButton/UserLogoutButton';
import UsernameEditForm from 'pages/ProfilePage/features/UsernameEditForm/UsernameEditForm';
import UserPhotoChangeButton from 'pages/ProfilePage/features/UserPhotoChangeButton/UserPhotoChangeButton';
import UserPhoto from 'entities/UserPhoto';
import { PageContentWrapper } from 'shared/wrappers';

const ProfilePage: FC = () => {
  const isAuthorised = useAppSelector((state) => state.user.userState.isUserAuthorised);

  if (!isAuthorised) {
    return <Navigate to="/login" />;
  }

  return (
    <PageContentWrapper style={{ margin: 'auto', maxWidth: '35rem' }}>
      <UserPhoto iconSize="12rem" className="align-self-center" />
      <UserPhotoChangeButton />
      <UserLogoutButton className="btn-outline-danger align-self-start" iconSize="1.3rem" />
      <UsernameEditForm />
    </PageContentWrapper>
  );
};

export default ProfilePage;

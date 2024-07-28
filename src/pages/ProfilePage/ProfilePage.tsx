import { FC } from 'react';
// Store
import { useAppSelector } from 'store/hook.ts';
// Router
import { Navigate } from 'react-router-dom';
// Features
import LogoutButton from 'pages/ProfilePage/features/LogoutButton';
import UsernameEditForm from 'pages/ProfilePage/features/UsernameEditForm';
import ProfilePhotoFeature from 'components_legacy/pages/profile_page/ProfilePhotoFeature.tsx';
import PageContentWrapper from 'shared/wrappers/PageContentWrapper';

const ProfilePage: FC = () => {
  const isAuthorised = useAppSelector((state) => state.user.userState.isUserAuthorised);

  if (!isAuthorised) {
    return <Navigate to="/login" />;
  }

  return (
    <PageContentWrapper style={{ margin: 'auto', maxWidth: '25rem' }}>
      <ProfilePhotoFeature />
      <LogoutButton className="btn-outline-danger align-self-start" iconSize="1.3rem" />
      <UsernameEditForm />
    </PageContentWrapper>
  );
};

export default ProfilePage;

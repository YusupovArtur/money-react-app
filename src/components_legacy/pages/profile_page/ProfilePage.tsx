import { FC } from 'react';
import ExitButton from '../../pages/profile_page/ExitButton';
import UserNameForm from '../../pages/profile_page/UserNameForm';
import ProfilePhotoFeature from 'components_legacy/pages/profile_page/ProfilePhotoFeature.tsx';
import PageContentWrapper from 'shared/wrappers/PageContentWrapper';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from 'store/hook.ts';

const ProfilePage: FC = () => {
  const isAuthorised = useAppSelector((state) => state.user.userState.isUserAuthorised);

  if (!isAuthorised) {
    return <Navigate to="/login" />;
  }

  return (
    <PageContentWrapper style={{ margin: 'auto' }}>
      <ProfilePhotoFeature />
      <ExitButton />
      <UserNameForm />
    </PageContentWrapper>
  );
};

export default ProfilePage;

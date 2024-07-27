import { FC } from 'react';
import ExitButton from '../../pages/profile_page/ExitButton';
import UserNameForm from '../../pages/profile_page/UserNameForm';
import ProfilePhotoFeature from 'components_legacy/pages/profile_page/ProfilePhotoFeature.tsx';
import PageContentWrapper from 'shared/wrappers/PageContentWrapper';

const ProfilePage: FC = () => {
  return (
    <PageContentWrapper style={{ margin: 'auto' }}>
      <ProfilePhotoFeature />
      <ExitButton />
      <UserNameForm />
    </PageContentWrapper>
  );
};

export default ProfilePage;

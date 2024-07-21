import { FC } from 'react';
import ExitButton from '../../pages/profile_page/ExitButton';
import UserNameForm from '../../pages/profile_page/UserNameForm';
import ProfilePhotoFeature from 'components_legacy/pages/profile_page/ProfilePhotoFeature.tsx';

const ProfilePage: FC = () => {
  return (
    <div
      className="d-flex flex-column align-self-center bg-body-tertiary shadow-sm rounded-4 p-3"
      style={{ maxWidth: '45rem', width: '100vw' }}
    >
      <ProfilePhotoFeature></ProfilePhotoFeature>
      <ExitButton></ExitButton>
      <UserNameForm></UserNameForm>
    </div>
  );
};

export default ProfilePage;

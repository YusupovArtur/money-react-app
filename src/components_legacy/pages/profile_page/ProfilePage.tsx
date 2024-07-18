import { FC } from 'react';
import ProfilePhoto from '../../pages/profile_page/ProfilePhoto';
import ExitButton from '../../pages/profile_page/ExitButton';
import UserNameForm from '../../pages/profile_page/UserNameForm';

const ProfilePage: FC = () => {
  return (
    <div
      className="d-flex flex-column align-self-center bg-body-tertiary shadow-sm rounded-4 p-3"
      style={{ maxWidth: '45rem', width: '100vw' }}
    >
      <ProfilePhoto></ProfilePhoto>
      <ExitButton></ExitButton>
      <UserNameForm></UserNameForm>
    </div>
  );
};

export default ProfilePage;

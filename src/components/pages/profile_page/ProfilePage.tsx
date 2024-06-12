import React from 'react';
import ProfilePhoto from 'components/pages/profile_page/ProfilePhoto';
import ExitButton from 'components/pages/profile_page/ExitButton';
import UserNameForm from 'components/pages/profile_page/UserNameForm';

function ProfilePage(): React.ReactElement {
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
}

export default ProfilePage;

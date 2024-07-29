import UserStateType from './UserStateType.ts';

type UserSliceStateType = {
  userState: UserStateType;
  isShouldRemember: boolean;
};

export default UserSliceStateType;

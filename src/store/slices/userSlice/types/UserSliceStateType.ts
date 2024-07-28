import UserStateType from 'store/slices/userSlice/types/UserStateType.ts';

type UserSliceStateType = {
  userState: UserStateType;
  isShouldRemember: boolean;
};

export default UserSliceStateType;

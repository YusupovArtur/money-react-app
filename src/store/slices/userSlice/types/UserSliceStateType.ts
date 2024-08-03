import { UserStateType } from './UserStateType.ts';

export type UserSliceStateType = {
  userState: UserStateType;
  isShouldRemember: boolean;
};

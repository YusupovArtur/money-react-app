import { UserType } from './UserType.ts';

export type UserStateType = {
  userState: UserType;
  isShouldRemember: boolean;
  photoDataURL: string | null;
};

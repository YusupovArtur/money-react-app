import { User } from 'firebase/auth';
import { UserStateType } from 'store/slices/userSlice';

export const getUserState = (user: User | null): UserStateType => {
  if (user) {
    return {
      isUserAuthorised: true,
      email: user.email,
      username: user.displayName,
      id: user.uid,
      isEmailVerified: user.emailVerified,
      photoURL: user.photoURL,
    };
  } else {
    return {
      isUserAuthorised: false,
      email: null,
      username: null,
      id: null,
      isEmailVerified: false,
      photoURL: null,
    };
  }
};

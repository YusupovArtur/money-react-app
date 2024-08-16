import { User } from 'firebase/auth';
import { UserType } from 'store/slices/userSlice';

export const getUserState = (user: User | null): UserType => {
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

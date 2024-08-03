export { default } from './userSlice.ts';
export { setUserState, clearUserState, setIsRemember } from './userSlice.ts';
export { default as getUserState } from './helpers/getUserState.ts';

export { logoutUser } from './asyncThunks/logoutUser.ts';
export { updateUserState } from './asyncThunks/updateUserState';
export { signinUserWithEmailAndPassword } from './asyncThunks/signinUserWithEmailAndPassword';
export { signupUserWithEmailAndPassword } from './asyncThunks/signupUserWithEmailAndPassword';
export { signinUserWithGitHub } from './asyncThunks/signinUserWithGitHub';
export { signinUserWithGoogle } from './asyncThunks/signinUserWithGoogle';
export { uploadUserPhoto } from './asyncThunks/uploadUserPhoto.ts';

export type { UserStateType } from './types/UserStateType.ts';
export type { UserSliceStateType } from './types/UserSliceStateType.ts';

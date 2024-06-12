import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from 'firebase/auth';
import { getErrorMessage, getUserState } from 'store/functions';
import { userStateType, serverResponseStatusHooks } from 'store/types';

export const signUpUserWithEmailAndPassword = createAsyncThunk<
  userStateType | void,
  serverResponseStatusHooks & { email: string; password: string }
>('user/signUpUserWithEmailAndPassword', async (props) => {
  const { email, password, setIsLoading, setErrorMessage, isOk } = props;
  if (setErrorMessage) setErrorMessage('');
  if (setIsLoading) setIsLoading(true);
  const auth = getAuth();
  return await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      if (setIsLoading) setIsLoading(false);
      if (isOk) isOk.current = true;
      return getUserState(user);
    })
    .catch((error) => {
      console.error('Ошибка регистрации:', error.code);
      if (setErrorMessage) setErrorMessage(getErrorMessage(error.code));
      if (setIsLoading) setIsLoading(false);
      if (isOk) isOk.current = false;
    });
});

export const signInUserWithGoogle = createAsyncThunk<userStateType | void, serverResponseStatusHooks>(
  'user/signInWithGoogle',
  async (props) => {
    const { setIsLoading, setErrorMessage, isOk } = props;
    if (setErrorMessage) setErrorMessage('');
    if (setIsLoading) setIsLoading(true);
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
      .then((userCredential) => {
        const user = userCredential.user;
        if (setIsLoading) setIsLoading(false);
        if (isOk) isOk.current = true;
        return getUserState(user);
      })
      .catch((error) => {
        console.error('Ошибка авторизации c помощью Google:', error.code);
        if (setErrorMessage) setErrorMessage(getErrorMessage(error.code));
        if (setIsLoading) setIsLoading(false);
        if (isOk) isOk.current = false;
      });
  },
);

export const signInUserWithGitHub = createAsyncThunk<userStateType | void, serverResponseStatusHooks>(
  'user/signInWithGitHub',
  async (props) => {
    const { setIsLoading, setErrorMessage, isOk } = props;
    if (setErrorMessage) setErrorMessage('');
    if (setIsLoading) setIsLoading(true);
    const auth = getAuth();
    const provider = new GithubAuthProvider();
    return signInWithPopup(auth, provider)
      .then((userCredential) => {
        const user = userCredential.user;
        if (setIsLoading) setIsLoading(false);
        if (isOk) isOk.current = true;
        return getUserState(user);
      })
      .catch((error) => {
        console.error('Ошибка авторизации c помощью GitHub:', error.code);
        if (setErrorMessage) setErrorMessage(getErrorMessage(error.code));
        if (setIsLoading) setIsLoading(false);
        if (isOk) isOk.current = false;
      });
  },
);

export const signInUserWithEmailAndPassword = createAsyncThunk<
  userStateType | void,
  serverResponseStatusHooks & { email: string; password: string }
>('user/signInUserWithEmailAndPassword', async function (props) {
  const { email, password, setIsLoading, setErrorMessage, isOk } = props;
  if (setErrorMessage) setErrorMessage('');
  if (setIsLoading) setIsLoading(true);
  const auth = getAuth();
  return await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      if (setIsLoading) setIsLoading(false);
      if (isOk) isOk.current = true;
      return getUserState(user);
    })
    .catch((error) => {
      console.error('Ошибка входа:', error.code);
      if (setErrorMessage) setErrorMessage(getErrorMessage(error.code));
      if (setIsLoading) setIsLoading(false);
      if (isOk) isOk.current = false;
    });
});

export const exitUser = createAsyncThunk<userStateType | void, serverResponseStatusHooks>('user/exitUser', async (props) => {
  const { setIsLoading, setErrorMessage, isOk } = props;
  if (setErrorMessage) setErrorMessage('');
  if (setIsLoading) setIsLoading(true);
  const auth = getAuth();
  return await signOut(auth)
    .then(() => {
      if (setIsLoading) setIsLoading(false);
      if (isOk) isOk.current = true;
      return getUserState(null);
    })
    .catch((error) => {
      console.error('Ошибка выхода пользователя:', error.code);
      if (setErrorMessage) setErrorMessage(getErrorMessage(error.code));
      if (setIsLoading) setIsLoading(false);
      if (isOk) isOk.current = false;
    });
});

export const updateUserName = createAsyncThunk<
  { userName: string | null } | void,
  serverResponseStatusHooks & { userName: string }
>('user/updateUserName', async (props) => {
  const { userName, setIsLoading, setErrorMessage, isOk } = props;
  if (setErrorMessage) setErrorMessage('');
  if (setIsLoading) setIsLoading(true);
  const auth = getAuth();
  if (auth.currentUser) {
    return await updateProfile(auth.currentUser, { displayName: userName })
      .then(() => {
        if (setIsLoading) setIsLoading(false);
        if (isOk) isOk.current = true;
        return { userName: userName };
      })
      .catch((error) => {
        console.error('Ошибка обновления имени:', error.code);
        if (setErrorMessage) setErrorMessage(getErrorMessage(error.code));
        if (setIsLoading) setIsLoading(false);
        if (isOk) isOk.current = false;
      });
  } else {
    if (setErrorMessage) setErrorMessage('Вы не авторизованы');
    if (setIsLoading) setIsLoading(false);
    if (isOk) isOk.current = false;
  }
});

export const updatePhotoURL = createAsyncThunk<
  { photoURL: string | null } | void,
  serverResponseStatusHooks & { photoURL: string }
>('user/updatePhotoURL', async (props) => {
  const { photoURL, setIsLoading, setErrorMessage, isOk } = props;
  if (setErrorMessage) setErrorMessage('');
  if (setIsLoading) setIsLoading(true);
  const auth = getAuth();
  if (auth.currentUser) {
    return await updateProfile(auth.currentUser, { photoURL: photoURL })
      .then(() => {
        if (setIsLoading) setIsLoading(false);
        if (isOk) isOk.current = true;
        return { photoURL: photoURL };
      })
      .catch((error) => {
        console.error('Ошибка обновления фото:', error.code);
        if (setErrorMessage) setErrorMessage(getErrorMessage(error.code));
        if (setIsLoading) setIsLoading(false);
        if (isOk) isOk.current = false;
      });
  } else {
    if (setErrorMessage) setErrorMessage('Вы не авторизованы');
    if (setIsLoading) setIsLoading(false);
    if (isOk) isOk.current = false;
  }
});

export const verifieEmail = createAsyncThunk<void, serverResponseStatusHooks>('user/verifieEmail', async (props) => {
  const { setIsLoading, setErrorMessage, isOk } = props;
  if (setErrorMessage) setErrorMessage('');
  if (setIsLoading) setIsLoading(true);
  const auth = getAuth();
  if (auth.currentUser) {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        if (setIsLoading) setIsLoading(false);
        if (isOk) isOk.current = true;
      })
      .catch((error) => {
        console.error('Ошибка верификации электронной почты:', error.code);
        if (setErrorMessage) setErrorMessage(getErrorMessage(error.code));
        if (setIsLoading) setIsLoading(false);
        if (isOk) isOk.current = false;
      });
  } else {
    if (setErrorMessage) setErrorMessage('Вы не авторизованы');
    if (setIsLoading) setIsLoading(false);
    if (isOk) isOk.current = false;
  }
});

const initialState: { userState: userStateType; isShouldRemember: boolean } = {
  userState: { isUserAuthorised: false, email: null, userName: null, id: null, isEmailVerified: false, photoURL: null },
  isShouldRemember: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    setIsRemember(state, action: PayloadAction<boolean>) {
      state.isShouldRemember = action.payload;
    },
    setUserState(state, action: PayloadAction<userStateType>) {
      state.userState = action.payload;
    },
    cleareUserState(state) {
      state.userState = getUserState(null);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(signUpUserWithEmailAndPassword.fulfilled, (state, action) => {
        if (action.payload) state.userState = action.payload;
      })
      .addCase(signInUserWithGoogle.fulfilled, (state, action) => {
        if (action.payload) state.userState = action.payload;
      })
      .addCase(signInUserWithGitHub.fulfilled, (state, action) => {
        if (action.payload) state.userState = action.payload;
      })
      .addCase(signInUserWithEmailAndPassword.fulfilled, (state, action) => {
        if (action.payload) state.userState = action.payload;
      })
      .addCase(updateUserName.fulfilled, (state, action) => {
        if (action.payload) state.userState.userName = action.payload.userName;
      })
      .addCase(updatePhotoURL.fulfilled, (state, action) => {
        if (action.payload) state.userState.photoURL = action.payload.photoURL;
      })
      .addCase(exitUser.fulfilled, (state, action) => {
        if (action.payload) state.userState = action.payload;
      });
  },
});

export const { setUserState, cleareUserState, setIsRemember } = userSlice.actions;
export default userSlice.reducer;

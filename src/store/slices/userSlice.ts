import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { getErrorMessage, getUserState } from 'store/functions';
import { serverResponseStatusHooks, userStateType } from 'store/types';

export const signupUserWithEmailAndPassword = createAsyncThunk<
  userStateType | void,
  serverResponseStatusHooks & { email: string; password: string }
>('user/signupUserWithEmailAndPassword', async (props) => {
  const { email, password, setIsLoading, setErrorMessage, onFulfilled } = props;
  if (setErrorMessage) setErrorMessage('');
  if (setIsLoading) setIsLoading(true);
  const auth = getAuth();
  return await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      if (setIsLoading) setIsLoading(false);
      if (onFulfilled) onFulfilled();
      return getUserState(user);
    })
    .catch((error) => {
      console.error('Ошибка регистрации:', error.code);
      if (setErrorMessage) setErrorMessage(getErrorMessage(error.code));
      if (setIsLoading) setIsLoading(false);
    });
});

export const signinUserWithGoogle = createAsyncThunk<userStateType | void, serverResponseStatusHooks>(
  'user/signinWithGoogle',
  async (props) => {
    const { setIsLoading, setErrorMessage, onFulfilled } = props;
    if (setErrorMessage) setErrorMessage('');
    if (setIsLoading) setIsLoading(true);
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
      .then((userCredential) => {
        const user = userCredential.user;
        if (setIsLoading) setIsLoading(false);
        if (onFulfilled) onFulfilled();
        return getUserState(user);
      })
      .catch((error) => {
        console.error('Ошибка авторизации c помощью Google:', error.code);
        if (setErrorMessage) setErrorMessage(getErrorMessage(error.code));
        if (setIsLoading) setIsLoading(false);
      });
  },
);

export const signinUserWithGitHub = createAsyncThunk<userStateType | void, serverResponseStatusHooks>(
  'user/signinWithGitHub',
  async (props) => {
    const { setIsLoading, setErrorMessage, onFulfilled } = props;
    if (setErrorMessage) setErrorMessage('');
    if (setIsLoading) setIsLoading(true);
    const auth = getAuth();
    const provider = new GithubAuthProvider();
    return signInWithPopup(auth, provider)
      .then((userCredential) => {
        const user = userCredential.user;
        if (setIsLoading) setIsLoading(false);
        if (onFulfilled) onFulfilled();
        return getUserState(user);
      })
      .catch((error) => {
        console.error('Ошибка авторизации c помощью GitHub:', error.code);
        if (setErrorMessage) setErrorMessage(getErrorMessage(error.code));
        if (setIsLoading) setIsLoading(false);
      });
  },
);

export const signinUserWithEmailAndPassword = createAsyncThunk<
  userStateType | void,
  serverResponseStatusHooks & { email: string; password: string }
>('user/signinUserWithEmailAndPassword', async function (props) {
  const { email, password, setIsLoading, setErrorMessage, onFulfilled } = props;
  if (setErrorMessage) setErrorMessage('');
  if (setIsLoading) setIsLoading(true);
  const auth = getAuth();
  return await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      if (setIsLoading) setIsLoading(false);
      if (onFulfilled) onFulfilled();
      return getUserState(user);
    })
    .catch((error) => {
      console.error('Ошибка входа:', error.code);
      if (setErrorMessage) setErrorMessage(getErrorMessage(error.code));
      if (setIsLoading) setIsLoading(false);
    });
});

export const logoutUser = createAsyncThunk<userStateType | void, serverResponseStatusHooks>('user/logoutUser', async (props) => {
  const { setIsLoading, setErrorMessage, onFulfilled } = props;
  if (setErrorMessage) setErrorMessage('');
  if (setIsLoading) setIsLoading(true);
  const auth = getAuth();
  return await signOut(auth)
    .then(() => {
      if (setIsLoading) setIsLoading(false);
      if (onFulfilled) onFulfilled();
      return getUserState(null);
    })
    .catch((error) => {
      console.error('Ошибка выхода пользователя:', error.code);
      if (setErrorMessage) setErrorMessage(getErrorMessage(error.code));
      if (setIsLoading) setIsLoading(false);
    });
});

export const updateUsername = createAsyncThunk<
  { username: string | null } | void,
  serverResponseStatusHooks & { username: string }
>('user/updateUsername', async (props) => {
  const { username, setIsLoading, setErrorMessage, onFulfilled } = props;
  if (setErrorMessage) setErrorMessage('');
  if (setIsLoading) setIsLoading(true);
  const auth = getAuth();
  if (auth.currentUser) {
    return await updateProfile(auth.currentUser, { displayName: username })
      .then(() => {
        if (setIsLoading) setIsLoading(false);
        if (onFulfilled) onFulfilled();
        return { username };
      })
      .catch((error) => {
        console.error('Ошибка обновления имени:', error.code);
        if (setErrorMessage) setErrorMessage(getErrorMessage(error.code));
        if (setIsLoading) setIsLoading(false);
      });
  } else {
    if (setErrorMessage) setErrorMessage('Вы не авторизованы');
    if (setIsLoading) setIsLoading(false);
  }
});

export const updatePhotoURL = createAsyncThunk<
  { photoURL: string | null } | void,
  serverResponseStatusHooks & { photoURL: string }
>('user/updatePhotoURL', async (props) => {
  const { photoURL, setIsLoading, setErrorMessage, onFulfilled } = props;
  if (setErrorMessage) setErrorMessage('');
  if (setIsLoading) setIsLoading(true);
  const auth = getAuth();
  if (auth.currentUser) {
    return await updateProfile(auth.currentUser, { photoURL })
      .then(() => {
        if (setIsLoading) setIsLoading(false);
        if (onFulfilled) onFulfilled();
        return { photoURL };
      })
      .catch((error) => {
        console.error('Ошибка обновления фото:', error.code);
        if (setErrorMessage) setErrorMessage(getErrorMessage(error.code));
        if (setIsLoading) setIsLoading(false);
      });
  } else {
    if (setErrorMessage) setErrorMessage('Вы не авторизованы');
    if (setIsLoading) setIsLoading(false);
  }
});

export const verifyEmail = createAsyncThunk<void, serverResponseStatusHooks>('user/verifyEmail', async (props) => {
  const { setIsLoading, setErrorMessage, onFulfilled } = props;
  if (setErrorMessage) setErrorMessage('');
  if (setIsLoading) setIsLoading(true);
  const auth = getAuth();
  if (auth.currentUser) {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        if (setIsLoading) setIsLoading(false);
        if (onFulfilled) onFulfilled();
      })
      .catch((error) => {
        console.error('Ошибка верификации электронной почты:', error.code);
        if (setErrorMessage) setErrorMessage(getErrorMessage(error.code));
        if (setIsLoading) setIsLoading(false);
      });
  } else {
    if (setErrorMessage) setErrorMessage('Вы не авторизованы');
    if (setIsLoading) setIsLoading(false);
  }
});

const initialState: { userState: userStateType; isShouldRemember: boolean } = {
  userState: { isUserAuthorised: false, email: null, username: null, id: null, isEmailVerified: false, photoURL: null },
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
    clearUserState(state) {
      state.userState = getUserState(null);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(signupUserWithEmailAndPassword.fulfilled, (state, action) => {
        if (action.payload) state.userState = action.payload;
      })
      .addCase(signinUserWithGoogle.fulfilled, (state, action) => {
        if (action.payload) state.userState = action.payload;
      })
      .addCase(signinUserWithGitHub.fulfilled, (state, action) => {
        if (action.payload) state.userState = action.payload;
      })
      .addCase(signinUserWithEmailAndPassword.fulfilled, (state, action) => {
        if (action.payload) state.userState = action.payload;
      })
      .addCase(updateUsername.fulfilled, (state, action) => {
        if (action.payload) state.userState.username = action.payload.username;
      })
      .addCase(updatePhotoURL.fulfilled, (state, action) => {
        if (action.payload) state.userState.photoURL = action.payload.photoURL;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        if (action.payload) state.userState = action.payload;
        state.isShouldRemember = false;
      });
  },
});

export const { setUserState, clearUserState, setIsRemember } = userSlice.actions;
export default userSlice.reducer;

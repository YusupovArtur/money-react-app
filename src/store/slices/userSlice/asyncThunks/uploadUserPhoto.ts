import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { storage } from 'app/firebase.ts';
import { getAuth } from 'firebase/auth';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { setPhotoDataURL, updateUserState, UserStateType } from 'store/slices/userSlice';
import { ResponseHooksType } from 'store';
import { getErrorMessage } from 'store/helpers/getErrorMessage.ts';

export const uploadUserPhoto = createAsyncThunk<
  void,
  ResponseHooksType & { photoDataURL: string },
  {
    rejectValue: string;
  }
>('user/uploadUserPhoto', async (props, { dispatch, rejectWithValue }) => {
  const { photoDataURL } = props;
  const auth = getAuth();

  if (auth.currentUser) {
    const userID = auth.currentUser.uid;
    const photoRef = ref(storage, `users_photos/${userID}/profile_photo`);

    return await uploadString(photoRef, photoDataURL, 'data_url')
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      })
      .then((url) => {
        return dispatch(updateUserState({ photoURL: url }));
      })
      .then((result) => {
        if (updateUserState.fulfilled.match(result)) {
          return;
        }
        if (updateUserState.rejected.match(result)) {
          return rejectWithValue(getErrorMessage(result.payload));
        }
      })
      .then(() => {
        dispatch(setPhotoDataURL(photoDataURL));
      })
      .catch((error) => {
        return rejectWithValue(getErrorMessage(error));
      });
  } else {
    return rejectWithValue('Вы не авторизованы');
  }
});

export const addUploadUserPhotoExtraReducers = (builder: ActionReducerMapBuilder<UserStateType>) => {
  builder
    .addCase(uploadUserPhoto.pending, (_state, action) => {
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(true);
      if (action.meta.arg.setErrorMessage) action.meta.arg.setErrorMessage('');
    })
    .addCase(uploadUserPhoto.fulfilled, (_state, action) => {
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(false);
      if (action.meta.arg.setErrorMessage) action.meta.arg.setErrorMessage('');
      if (action.meta.arg.onFulfilled) action.meta.arg.onFulfilled();
    })
    .addCase(uploadUserPhoto.rejected, (_state, action) => {
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(false);
      if (action.meta.arg.setErrorMessage && action.payload !== undefined) action.meta.arg.setErrorMessage(action.payload);
      console.error('Ошибка выгрузки фото:', action.payload);
    });
};

import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { storage } from 'app/firebase.ts';
import { getAuth } from 'firebase/auth';
import { deleteObject, ref } from 'firebase/storage';
import { fetchPhotoDataURL, updateUserState, UserStateType } from 'store/slices/userSlice';
import { ResponseHooksType } from 'store';
import { getErrorMessage } from 'store/helpers/getErrorMessage.ts';

export const deleteUserPhoto = createAsyncThunk<
  void,
  ResponseHooksType,
  {
    rejectValue: string;
  }
>('user/deleteUserPhoto', async (_props, { dispatch, rejectWithValue }) => {
  const auth = getAuth();

  if (auth.currentUser) {
    const userID = auth.currentUser.uid;
    const photoRef = ref(storage, `users_photos/${userID}/profile_photo`);

    await dispatch(updateUserState({ photoURL: '' }))
      .then((result) => {
        if (updateUserState.fulfilled.match(result)) {
          return;
        }
        if (updateUserState.rejected.match(result)) {
          throw result.payload;
        }
      })
      .then(() => {
        return dispatch(fetchPhotoDataURL({}));
      })
      .then((result) => {
        if (fetchPhotoDataURL.fulfilled.match(result)) {
          return;
        }
        if (fetchPhotoDataURL.rejected.match(result)) {
          throw result.payload;
        }
      })
      .then(async () => {
        try {
          await deleteObject(photoRef);
          return;
        } catch (error) {
          return rejectWithValue(getErrorMessage(error));
        }
      })
      .catch((error) => {
        return rejectWithValue(getErrorMessage(error));
      });
  } else {
    return rejectWithValue('Вы не авторизованы');
  }
});

export const addDeleteUserPhotoExtraReducers = (builder: ActionReducerMapBuilder<UserStateType>) => {
  builder
    .addCase(deleteUserPhoto.pending, (_state, action) => {
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(true);
      if (action.meta.arg.setErrorMessage) action.meta.arg.setErrorMessage('');
    })
    .addCase(deleteUserPhoto.fulfilled, (_state, action) => {
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(false);
      if (action.meta.arg.setErrorMessage) action.meta.arg.setErrorMessage('');
      if (action.meta.arg.onFulfilled) action.meta.arg.onFulfilled();
    })
    .addCase(deleteUserPhoto.rejected, (_state, action) => {
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(false);
      if (action.meta.arg.setErrorMessage && action.payload !== undefined) action.meta.arg.setErrorMessage(action.payload);
      console.error('Ошибка удаления фото:', action.payload);
    });
};

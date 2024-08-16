import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { storage } from 'app/firebase.ts';
import { getAuth } from 'firebase/auth';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { setPhotoDataURL, updateUserState, UserStateType } from 'store/slices/userSlice';
import { getErrorMessage, ResponseHooksType } from 'store';

export const uploadUserPhoto = createAsyncThunk<
  void,
  ResponseHooksType & { photoDataURL: string },
  {
    rejectValue: string;
  }
>('user/uploadUserPhoto', async (props, { dispatch, rejectWithValue }) => {
  const { photoDataURL, ...responseHooks } = props;
  const auth = getAuth();

  if (auth.currentUser) {
    const userID = auth.currentUser.uid;
    const storageRef = ref(storage, `users_photos/${userID}/profile_photo`);

    return await uploadString(storageRef, photoDataURL, 'data_url')
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((url) => {
            return dispatch(updateUserState({ photoURL: url, ...responseHooks }));
          })
          .then((result) => {
            if (updateUserState.fulfilled.match(result)) {
              dispatch(setPhotoDataURL(photoDataURL));
            }
          })
          .catch((error) => {
            return rejectWithValue(getErrorMessage(error.code));
          });
      })
      .catch((error) => {
        return rejectWithValue(getErrorMessage(error.code));
      });
  } else {
    return rejectWithValue('Вы не авторизованы');
  }
});

export const addUpdateUserPhotoExtraReducers = (builder: ActionReducerMapBuilder<UserStateType>) => {
  builder
    .addCase(uploadUserPhoto.pending, (_state, action) => {
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(true);
      if (action.meta.arg.setErrorMessage) action.meta.arg.setErrorMessage('');
    })
    // .addCase(uploadUserPhoto.fulfilled, (state, action) => {
    //   state.photoDataURL = action.meta.arg.photoDataURL;
    // })
    .addCase(uploadUserPhoto.rejected, (_state, action) => {
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(false);
      if (action.meta.arg.setErrorMessage && action.payload !== undefined) action.meta.arg.setErrorMessage(action.payload);
      console.error('Ошибка выгрузки фото:', action.payload);
    });
};

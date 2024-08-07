import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { storage } from 'app/firebase.ts';
import { getAuth } from 'firebase/auth';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { updateUserState, UserSliceStateType } from 'store/slices/userSlice';
import { getErrorMessage, ResponseHooksType } from 'store';

export const uploadUserPhoto = createAsyncThunk<
  void,
  ResponseHooksType & { imageDataURL: string },
  {
    rejectValue: string;
  }
>('user/uploadUserPhoto', async (props, { dispatch, rejectWithValue }) => {
  const { imageDataURL, setIsLoading, setErrorMessage, onFulfilled } = props;
  const auth = getAuth();

  if (auth.currentUser) {
    const userID = auth.currentUser.uid;
    const storageRef = ref(storage, `users_photos/${userID}/profile_photo`);

    return await uploadString(storageRef, imageDataURL, 'data_url')
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((url) => {
            dispatch(updateUserState({ photoURL: url, setIsLoading, setErrorMessage, onFulfilled }));
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

export const addUpdateUserPhotoExtraReducers = (builder: ActionReducerMapBuilder<UserSliceStateType>) => {
  builder
    .addCase(uploadUserPhoto.pending, (_state, action) => {
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(true);
      if (action.meta.arg.setErrorMessage) action.meta.arg.setErrorMessage('');
    })
    .addCase(uploadUserPhoto.rejected, (_state, action) => {
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(false);
      if (action.meta.arg.setErrorMessage && action.payload !== undefined) action.meta.arg.setErrorMessage(action.payload);
      console.error('Ошибка выгрузки фото:', action.payload);
    });
};

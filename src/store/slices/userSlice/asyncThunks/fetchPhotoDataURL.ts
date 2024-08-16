import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { getAuth } from 'firebase/auth';
import { UserStateType } from 'store/slices/userSlice';
import { getErrorMessage, ResponseHooksType } from 'store';

const convertBlobToDataUrl = (blob: Blob) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(blob);
  });
};

export const fetchPhotoDataURL = createAsyncThunk<
  { imageDataURL: UserStateType['photoDataURL'] },
  { isFetchDefaultIcon?: boolean } & ResponseHooksType,
  {
    rejectValue: string;
  }
>('user/fetchPhotoDataURL', async (props, { rejectWithValue, dispatch }) => {
  const { isFetchDefaultIcon = false, ...responseHooks } = props;
  const auth = getAuth();

  if (auth.currentUser) {
    const user = auth.currentUser;
    const photoURL = isFetchDefaultIcon
      ? '/images/person-circle.svg'
      : user.photoURL
      ? user.photoURL
      : '/images/person-circle.svg';

    try {
      const response = await fetch(photoURL);

      if (!response.ok) {
        return rejectWithValue(`Ошибка зашрузки фото код ${response.status}`);
      }

      const blob = await response.blob();
      const imageDataURL = await convertBlobToDataUrl(blob);
      return { imageDataURL };
    } catch (error) {
      if (user.photoURL !== null && !isFetchDefaultIcon) {
        dispatch(fetchPhotoDataURL({ isFetchDefaultIcon: true, ...responseHooks }));
      }
      return rejectWithValue(getErrorMessage('Неизвестная ошибка'));
    }
  } else {
    return rejectWithValue('Вы не авторизованы');
  }
});

export const addFetchPhotoDataURLExtraReducers = (builder: ActionReducerMapBuilder<UserStateType>) => {
  builder
    .addCase(fetchPhotoDataURL.pending, (_state, action) => {
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(true);
      if (action.meta.arg.setErrorMessage) action.meta.arg.setErrorMessage('');
    })
    .addCase(fetchPhotoDataURL.fulfilled, (state, action) => {
      state.photoDataURL = action.payload.imageDataURL;
    })
    .addCase(fetchPhotoDataURL.rejected, (_state, action) => {
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(false);
      if (action.meta.arg.setErrorMessage && action.payload !== undefined) action.meta.arg.setErrorMessage(action.payload);
      console.error('Ошибка загрузки фото:', action.payload);
    });
};

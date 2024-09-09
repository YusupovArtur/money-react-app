import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { getAuth } from 'firebase/auth';
import { UserStateType } from 'store/slices/userSlice';
import { ResponseHooksType } from 'store';
import { getErrorMessage } from 'store/helpers/getErrorMessage.ts';

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

// TODO: решить проблему при ошибке CORS фетчится дефолтная иконка
export const fetchPhotoDataURL = createAsyncThunk<
  { imageDataURL: UserStateType['photoDataURL'] },
  ResponseHooksType,
  {
    rejectValue: string;
  }
>('user/fetchPhotoDataURL', async (_props, { rejectWithValue }) => {
  const auth = getAuth();

  if (auth.currentUser) {
    const photoURL = auth.currentUser.photoURL;

    try {
      if (!photoURL) {
        return { imageDataURL: null };
      }
      const response = await fetch(photoURL);

      if (!response.ok) {
        return rejectWithValue(`Ошибка зашрузки фото код ${response.status}`);
      }

      const blob = await response.blob();
      const imageDataURL = await convertBlobToDataUrl(blob);
      return { imageDataURL };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
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

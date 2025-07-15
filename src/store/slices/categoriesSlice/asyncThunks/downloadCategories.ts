import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { CategoriesOrderedListType, CategoriesStateType } from 'store/slices/categoriesSlice';
import { ResponseHooksType } from 'store/types/ResponseHooksType.ts';
import { getAuth } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { db } from 'app/firebase.ts';
import { getErrorMessage } from 'store/helpers/getErrorMessage.ts';
import { getValidCategoriesOrderedList } from 'store/slices/categoriesSlice/helpers/getValidCategoriesOrderedList.ts';

export const downloadCategories = createAsyncThunk<
  CategoriesOrderedListType,
  ResponseHooksType,
  {
    rejectValue: string;
  }
>('categories/downloadCategories', async (_props, { rejectWithValue }) => {
  const auth = getAuth();

  if (auth.currentUser) {
    const user = auth.currentUser;
    const categoriesRef = collection(db, 'users_data', user.uid, 'categories');

    return await getDocs(categoriesRef)
      .then((querySnapshot) => {
        return getValidCategoriesOrderedList(querySnapshot);
      })
      .catch((error) => {
        return rejectWithValue(getErrorMessage(error));
      });
  } else {
    return rejectWithValue('Вы не авторизованы');
  }
});

export const addDownloadCategoriesExtraReducers = (builder: ActionReducerMapBuilder<CategoriesStateType>) => {
  builder
    .addCase(downloadCategories.pending, (state, action) => {
      state.responseState.isLoading = true;
      state.responseState.errorMessage = '';

      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(true);
      if (action.meta.arg.setErrorMessage) action.meta.arg.setErrorMessage('');
    })
    .addCase(downloadCategories.fulfilled, (state, action) => {
      state.list = action.payload.list;
      state.order = action.payload.order;

      state.responseState.errorMessage = '';
      state.responseState.isLoading = false;

      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(false);
      if (action.meta.arg.setErrorMessage) action.meta.arg.setErrorMessage('');
      if (action.meta.arg.onFulfilled) action.meta.arg.onFulfilled();
    })
    .addCase(downloadCategories.rejected, (state, action) => {
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(false);
      if (action.meta.arg.setErrorMessage && action.payload !== undefined) action.meta.arg.setErrorMessage(action.payload);
      console.error('Ошибка чтения категорий:', action.payload);

      state.responseState.isLoading = false;
      if (action.payload !== undefined) state.responseState.errorMessage = action.payload;
    });
};

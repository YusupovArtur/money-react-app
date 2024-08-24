import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { CategoriesStateType, CategoryUpdateType } from 'store/slices/categoriesSlice';
import { ResponseHooksType } from 'store/types/ResponseHooksType.ts';
import { getAuth } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from 'app/firebase.ts';
import { getErrorMessage } from 'store/helpers/getErrorMessage.ts';

export const updateCategory = createAsyncThunk<
  { categoryID: string; categoryProps: CategoryUpdateType },
  { categoryID: string; categoryProps: CategoryUpdateType } & ResponseHooksType,
  { rejectValue: string }
>('categories/updateCategory', async (props, { rejectWithValue }) => {
  const auth = getAuth();
  const { categoryID, categoryProps } = props;

  if (auth.currentUser) {
    const user = auth.currentUser;
    const docRef = doc(db, 'users_data', user.uid, 'categories', categoryID);

    return await updateDoc(docRef, categoryProps)
      .then(() => {
        return { categoryID, categoryProps };
      })
      .catch((error) => {
        return rejectWithValue(getErrorMessage(error));
      });
  } else {
    return rejectWithValue('Вы не авторизованы');
  }
});

export const addUpdateCategoryExtraReducers = (builder: ActionReducerMapBuilder<CategoriesStateType>) => {
  builder
    .addCase(updateCategory.pending, (_state, action) => {
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(true);
      if (action.meta.arg.setErrorMessage) action.meta.arg.setErrorMessage('');
    })
    .addCase(updateCategory.fulfilled, (state, action) => {
      state.list[action.payload.categoryID] = { ...state.list[action.payload.categoryID], ...action.payload.categoryProps };

      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(false);
      if (action.meta.arg.setErrorMessage) action.meta.arg.setErrorMessage('');
      if (action.meta.arg.onFulfilled) action.meta.arg.onFulfilled();
    })
    .addCase(updateCategory.rejected, (_state, action) => {
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(false);
      if (action.meta.arg.setErrorMessage && action.payload !== undefined) action.meta.arg.setErrorMessage(action.payload);
      console.error('Ошибка изменения категории:', action.payload);
    });
};

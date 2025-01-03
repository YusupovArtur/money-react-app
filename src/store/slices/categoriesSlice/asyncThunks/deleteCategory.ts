import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { ResponseHooksType } from 'store/types/ResponseHooksType.ts';
import { getAuth } from 'firebase/auth';
import { arrayRemove, doc, runTransaction } from 'firebase/firestore';
import { db } from 'app/firebase.ts';
import { getErrorMessage } from 'store/helpers/getErrorMessage.ts';
import { CategoriesStateType } from 'store/slices/categoriesSlice';

export const deleteCategory = createAsyncThunk<
  { id: string },
  { id: string } & ResponseHooksType,
  {
    rejectValue: string;
  }
>('categories/deleteCategory', async (props, { rejectWithValue }) => {
  const auth = getAuth();
  const { id } = props;

  if (auth.currentUser) {
    const user = auth.currentUser;
    const orderRef = doc(db, 'users_data', user.uid, 'categories', 'order');
    const docRef = doc(db, 'users_data', user.uid, 'categories', id);

    window.pending.categories.delete = { id: id, flags: 2 };

    return await runTransaction(db, async (transaction) => {
      transaction.update(orderRef, { order: arrayRemove(id) });
      transaction.delete(docRef);

      return { id };
    }).catch((error) => {
      return rejectWithValue(getErrorMessage(error));
    });
  } else {
    return rejectWithValue('Вы не авторизованы');
  }
});

export const addDeleteCategoryExtraReducers = (builder: ActionReducerMapBuilder<CategoriesStateType>) => {
  builder
    .addCase(deleteCategory.pending, (_state, action) => {
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(true);
      if (action.meta.arg.setErrorMessage) action.meta.arg.setErrorMessage('');
    })
    .addCase(deleteCategory.fulfilled, (state, action) => {
      delete state.list[action.payload.id];
      state.order = state.order.filter((id) => id !== action.payload.id);

      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(false);
      if (action.meta.arg.setErrorMessage) action.meta.arg.setErrorMessage('');
      if (action.meta.arg.onFulfilled) action.meta.arg.onFulfilled();
    })
    .addCase(deleteCategory.rejected, (_state, action) => {
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(false);
      if (action.meta.arg.setErrorMessage && action.payload !== undefined) action.meta.arg.setErrorMessage(action.payload);
      console.error('Ошибка удаления категории:', action.payload);
    });
};

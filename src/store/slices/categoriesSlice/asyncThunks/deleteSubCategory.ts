import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { ResponseHooksType } from 'store/types/ResponseHooksType.ts';
import { getAuth } from 'firebase/auth';
import { arrayRemove, deleteField, doc, runTransaction } from 'firebase/firestore';
import { db } from 'app/firebase.ts';
import { getErrorMessage } from 'store/helpers/getErrorMessage.ts';
import { CategoriesStateType } from 'store/slices/categoriesSlice';

export const deleteSubCategory = createAsyncThunk<
  { categoryID: string; subcategoryID: string },
  ResponseHooksType & { categoryID: string; subcategoryID: string },
  { rejectValue: string }
>('categories/deleteSubCategory', async (props, { rejectWithValue }) => {
  const auth = getAuth();
  const { categoryID, subcategoryID } = props;

  if (auth.currentUser) {
    const user = auth.currentUser;
    const docRef = doc(db, 'users_data', user.uid, 'categories', categoryID);

    return await runTransaction(db, async (transaction) => {
      transaction.update(docRef, { [`subcategories.list.${subcategoryID}`]: deleteField() });
      transaction.update(docRef, { ['subcategories.order']: arrayRemove(subcategoryID) });

      return { categoryID, subcategoryID };
    }).catch((error) => {
      return rejectWithValue(getErrorMessage(error));
    });
  } else {
    return rejectWithValue('Вы не авторизованы');
  }
});

export const addDeleteSubCategoryExtraReducers = (builder: ActionReducerMapBuilder<CategoriesStateType>) => {
  builder
    .addCase(deleteSubCategory.pending, (_state, action) => {
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(true);
      if (action.meta.arg.setErrorMessage) action.meta.arg.setErrorMessage('');
    })
    .addCase(deleteSubCategory.fulfilled, (state, action) => {
      const subcategories = state.list[action.payload.categoryID].subcategories;

      delete subcategories.list[action.payload.subcategoryID];
      subcategories.order = subcategories.order.filter((id) => id !== action.payload.subcategoryID);

      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(false);
      if (action.meta.arg.setErrorMessage) action.meta.arg.setErrorMessage('');
      if (action.meta.arg.onFulfilled) action.meta.arg.onFulfilled();
    })
    .addCase(deleteSubCategory.rejected, (_state, action) => {
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(false);
      if (action.meta.arg.setErrorMessage && action.payload !== undefined) action.meta.arg.setErrorMessage(action.payload);
      console.error('Ошибка удаления подкатегории:', action.payload);
    });
};

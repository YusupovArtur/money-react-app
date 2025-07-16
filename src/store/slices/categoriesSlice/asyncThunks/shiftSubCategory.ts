import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { ResponseHooksType } from 'store/types/ResponseHooksType.ts';
import { getAuth } from 'firebase/auth';
import { doc, runTransaction } from 'firebase/firestore';
import { db } from 'app/firebase.ts';
import { CategoriesStateType } from 'store/slices/categoriesSlice';
import { shiftIndexes } from 'store/helpers/shiftIndexes.ts';
import { getValidCategory } from 'store/slices/categoriesSlice/helpers/getValidCategoriesOrderedList.ts';

export const shiftSubCategory = createAsyncThunk<
  { categoryID: string; order: string[] } | void,
  { categoryID: string; index1: number; index2: number } & ResponseHooksType,
  { rejectValue: string }
>('categories/shiftSubCategory', async (props, { rejectWithValue }) => {
  const auth = getAuth();
  const { categoryID, index1, index2 } = props;

  if (auth.currentUser) {
    const user = auth.currentUser;
    const categoryRef = doc(db, 'users_data', user.uid, 'categories', categoryID);

    if (index1 === index2) {
      return;
    }

    return await runTransaction(db, async (transaction) => {
      const categorySnapshot = await transaction.get(categoryRef);
      const order = getValidCategory(categorySnapshot).subcategories.order;

      const newOrder = shiftIndexes({ order: order, index1: index1, index2: index2 });
      transaction.update(categoryRef, { [`subcategories.order`]: newOrder });

      return { categoryID: categoryID, order: newOrder };
    });
  } else {
    return rejectWithValue('Вы не авторизованы');
  }
});

export const addShiftSubCategoryExtraReducers = (builder: ActionReducerMapBuilder<CategoriesStateType>) => {
  builder
    .addCase(shiftSubCategory.pending, (_state, action) => {
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(true);
      if (action.meta.arg.setErrorMessage) action.meta.arg.setErrorMessage('');
    })
    .addCase(shiftSubCategory.fulfilled, (state, action) => {
      if (action.payload) state.list[action.payload.categoryID].subcategories.order = action.payload.order;

      if (action.meta.arg.setErrorMessage) action.meta.arg.setErrorMessage('');
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(false);
      if (action.meta.arg.onFulfilled) action.meta.arg.onFulfilled();
    })
    .addCase(shiftSubCategory.rejected, (_state, action) => {
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(false);
      if (action.meta.arg.setErrorMessage && action.payload !== undefined) action.meta.arg.setErrorMessage(action.payload);
      console.error('Ошибка сортировки подкатегорий:', action.payload);
    });
};

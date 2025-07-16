import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { ResponseHooksType } from 'store/types/ResponseHooksType.ts';
import { getAuth } from 'firebase/auth';
import { doc, runTransaction } from 'firebase/firestore';
import { db } from 'app/firebase.ts';
import { getErrorMessage } from 'store/helpers/getErrorMessage.ts';
import { CategoriesStateType } from 'store/slices/categoriesSlice';
import { shiftIndexes } from 'store/helpers/shiftIndexes.ts';
import { getValidOrder } from 'store/helpers/getValidOrder.ts';

export const shiftCategory = createAsyncThunk<
  string[] | void,
  ResponseHooksType & { index1: number; index2: number },
  { rejectValue: string }
>('categories/shiftCategory', async (props, { rejectWithValue }) => {
  const auth = getAuth();
  const { index1, index2 } = props;

  if (auth.currentUser) {
    const user = auth.currentUser;
    const orderRef = doc(db, 'users_data', user.uid, 'categories', 'order');
    // noinspection DuplicatedCode
    if (index1 === index2) {
      return;
    }

    return await runTransaction(db, async (transaction) => {
      const orderSnapshot = await transaction.get(orderRef);
      const order = getValidOrder(orderSnapshot.data());
      const newOrder = shiftIndexes({ order: order, index1: index1, index2: index2 });

      transaction.set(orderRef, { order: newOrder });
      return newOrder;
    }).catch((error) => {
      return rejectWithValue(getErrorMessage(error));
    });
  } else {
    return rejectWithValue('Вы не авторизованы');
  }
});

export const addShiftCategoryExtraReducers = (builder: ActionReducerMapBuilder<CategoriesStateType>) => {
  builder
    .addCase(shiftCategory.pending, (_state, action) => {
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(true);
      if (action.meta.arg.setErrorMessage) action.meta.arg.setErrorMessage('');
    })
    .addCase(shiftCategory.fulfilled, (state, action) => {
      if (Array.isArray(action.payload)) state.order = action.payload;

      if (action.meta.arg.onFulfilled) action.meta.arg.onFulfilled();
      if (action.meta.arg.setErrorMessage) action.meta.arg.setErrorMessage('');
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(false);
    })
    .addCase(shiftCategory.rejected, (_state, action) => {
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(false);
      if (action.meta.arg.setErrorMessage && action.payload !== undefined) action.meta.arg.setErrorMessage(action.payload);
      console.error('Ошибка сортировки категорий:', action.payload);
    });
};

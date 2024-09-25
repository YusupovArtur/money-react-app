import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { ResponseHooksType } from 'store/types/ResponseHooksType.ts';
import { getAuth } from 'firebase/auth';
import { doc, runTransaction } from 'firebase/firestore';
import { db } from 'app/firebase.ts';
import { getErrorMessage } from 'store/helpers/getErrorMessage.ts';
import { CATEGORIES_LIST_LAST_ITEM_ID, CategoriesStateType } from 'store/slices/categoriesSlice';

export const shiftCategory = createAsyncThunk<
  { order: string[] } | void,
  { categoryID1: string; categoryID2: string } & ResponseHooksType,
  { rejectValue: string }
>('categories/shiftCategory', async (props, { rejectWithValue }) => {
  const auth = getAuth();
  const { categoryID1: id1, categoryID2: id2 } = props;

  if (auth.currentUser) {
    const user = auth.currentUser;
    const orderRef = doc(db, 'users_data', user.uid, 'categories', 'order');

    if (id1 === id2) {
      return;
    }

    return await runTransaction(db, async (transaction) => {
      const orderSnapshot = await transaction.get(orderRef);
      const order = orderSnapshot.data() ? (orderSnapshot.data() as { order: string[] }).order : [];

      const index1 = order.findIndex((id) => id1 === id);

      if (index1 !== -1) {
        order.splice(index1, 1);
        if (id2 === CATEGORIES_LIST_LAST_ITEM_ID) {
          order.push(id1);

          window.pending.categories.shift = { order, flags: 2 };
          transaction.set(orderRef, { order });
          return { order };
        }

        const index2 = order.findIndex((id) => id2 === id);
        if (index2 !== -1) {
          order.splice(index2, 0, id1);

          window.pending.categories.shift = { order, flags: 2 };
          transaction.set(orderRef, { order });
          return { order };
        } else {
          return rejectWithValue('No find id2');
        }
      } else {
        return rejectWithValue('Not find id1');
      }
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
      if (action.payload) state.order = action.payload.order;

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

import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { ResponseHooksType } from 'store/types/ResponseHooksType.ts';
import { getAuth } from 'firebase/auth';
import { doc, runTransaction } from 'firebase/firestore';
import { db } from 'app/firebase.ts';
import { CategoriesStateType, CategoryType } from 'store/slices/categoriesSlice';
import { shiftIndexes } from 'store/helpers/shiftIndexes.ts';

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
      const order = categorySnapshot.data() ? (categorySnapshot.data() as CategoryType).subcategories.order : [];

      const newOrder = shiftIndexes({ order: order, index1: index1, index2: index2 });
      transaction.update(categoryRef, { [`subcategories.order`]: newOrder });

      return { categoryID: categoryID, order: newOrder };

      // const index1 = order.findIndex((id) => id1 === id);
      //
      // if (index1 !== -1) {
      //   order.splice(index1, 1);
      //   if (id2 === SUBCATEGORIES_LIST_LAST_ITEM_ID) {
      //     order.push(id1);
      //     transaction.update(categoryRef, { [`subcategories.order`]: order });
      //     return { categoryID, order };
      //   }
      //
      //   const index2 = order.findIndex((id) => id2 === id);
      //   if (index2 !== -1) {
      //     order.splice(index2, 0, id1);
      //     transaction.update(categoryRef, { [`subcategories.order`]: order });
      //     return { categoryID, order };
      //   } else {
      //     return rejectWithValue('No find id2');
      //   }
      // } else {
      //   return rejectWithValue('Not find id1');
      // }
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

import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { ResponseHooksType } from 'store/types/ResponseHooksType.ts';
import { getAuth } from 'firebase/auth';
import { doc, runTransaction } from 'firebase/firestore';
import { db } from 'app/firebase.ts';
import { CategoriesStateType, CategoryType, SUBCATEGORIES_LIST_LAST_ITEM_ID } from 'store/slices/categoriesSlice';

export const shiftSubCategory = createAsyncThunk<
  { categoryID: string; order: string[] },
  { categoryID: string; subcategoryID1: string; subcategoryID2: string } & ResponseHooksType,
  { rejectValue: string }
>('categories/shiftSubCategory', async (props, { rejectWithValue }) => {
  const auth = getAuth();
  const { categoryID, subcategoryID1: id1, subcategoryID2: id2 } = props;

  if (auth.currentUser) {
    const user = auth.currentUser;
    const categoryRef = doc(db, 'users_data', user.uid, 'categories', categoryID);

    if (id1 === id2) {
      return rejectWithValue('id1 === id2');
    }

    return await runTransaction(db, async (transaction) => {
      const categorySnapshot = await transaction.get(categoryRef);
      const order = categorySnapshot.data() ? (categorySnapshot.data() as CategoryType).subcategories.order : [];

      const index1 = order.findIndex((id) => id1 === id);

      if (index1 !== -1) {
        order.splice(index1, 1);
        if (id2 === SUBCATEGORIES_LIST_LAST_ITEM_ID) {
          order.push(id1);
          transaction.update(categoryRef, { [`subcategories.order`]: order });
          return { categoryID, order };
        }

        const index2 = order.findIndex((id) => id2 === id);
        if (index2 !== -1) {
          order.splice(index2, 0, id1);
          transaction.update(categoryRef, { [`subcategories.order`]: order });
          return { categoryID, order };
        } else {
          return rejectWithValue('No find id2');
        }
      } else {
        return rejectWithValue('Not find id1');
      }
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
      state.list[action.payload.categoryID].subcategories.order = action.payload.order;

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

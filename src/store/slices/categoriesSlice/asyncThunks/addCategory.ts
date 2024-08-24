import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { CategoriesStateType, CategoryAddType, CategoryType } from 'store/slices/categoriesSlice';
import { ResponseHooksType } from 'store/types/ResponseHooksType.ts';
import { getAuth } from 'firebase/auth';
import { collection, doc, runTransaction } from 'firebase/firestore';
import { db } from 'app/firebase.ts';
import { getErrorMessage } from 'store/helpers/getErrorMessage.ts';

export const addCategory = createAsyncThunk<
  { id: string; category: CategoryType },
  { category: CategoryAddType } & ResponseHooksType,
  { rejectValue: string }
>('categories/addCategory', async (props, { rejectWithValue }) => {
  const auth = getAuth();
  const { category } = props;

  if (auth.currentUser) {
    const user = auth.currentUser;
    const orderRef = doc(db, 'users_data', user.uid, 'categories', 'order');
    const docsRef = collection(db, 'users_data', user.uid, 'categories');
    const docRef = doc(docsRef);

    return runTransaction(db, async (transaction) => {
      const orderSnapshot = (await transaction.get(orderRef)).data();
      const order = orderSnapshot ? (orderSnapshot as { order: string[] }).order : [];

      const categoryToAdd: CategoryType = { ...category, subcategories: { list: {}, order: [] } };
      transaction.set(docRef, categoryToAdd);
      const id = docRef.id;
      order.push(id);
      transaction.set(orderRef, { order });

      return { id, category: categoryToAdd };
    }).catch((error) => {
      return rejectWithValue(getErrorMessage(error));
    });
  } else {
    return rejectWithValue('Вы не авторизованы');
  }
});

export const addAddCategoryExtraReducers = (builder: ActionReducerMapBuilder<CategoriesStateType>) => {
  builder
    .addCase(addCategory.pending, (_state, action) => {
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(true);
      if (action.meta.arg.setErrorMessage) action.meta.arg.setErrorMessage('');
    })
    .addCase(addCategory.fulfilled, (state, action) => {
      state.list[action.payload.id] = action.payload.category;
      state.order.push(action.payload.id);

      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(false);
      if (action.meta.arg.setErrorMessage) action.meta.arg.setErrorMessage('');
      if (action.meta.arg.onFulfilled) action.meta.arg.onFulfilled();
    })
    .addCase(addCategory.rejected, (_state, action) => {
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(false);
      if (action.meta.arg.setErrorMessage && action.payload !== undefined) action.meta.arg.setErrorMessage(action.payload);
      console.error('Ошибка добавления категории:', action.payload);
    });
};

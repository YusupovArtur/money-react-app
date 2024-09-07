import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { CategoriesStateType, SubcategoryType } from 'store/slices/categoriesSlice';
import { ResponseHooksType } from 'store/types/ResponseHooksType.ts';
import { getAuth } from 'firebase/auth';
import { arrayUnion, doc, runTransaction } from 'firebase/firestore';
import { db } from 'app/firebase.ts';
import { generateID } from 'store/helpers/generateID.ts';
import { getErrorMessage } from 'store/helpers/getErrorMessage.ts';

export const addSubCategory = createAsyncThunk<
  { categoryID: string; subcategoryID: string; subcategory: SubcategoryType },
  { categoryID: string; subcategory: SubcategoryType } & ResponseHooksType,
  { rejectValue: string }
>('categories/addSubCategory', async (props, { rejectWithValue }) => {
  const auth = getAuth();
  const { categoryID, subcategory } = props;

  if (auth.currentUser) {
    const user = auth.currentUser;
    const docRef = doc(db, 'users_data', user.uid, 'categories', categoryID);
    const subcategoryID = generateID();

    return await runTransaction(db, async (transaction) => {
      transaction.update(docRef, { 'subcategories.order': arrayUnion(subcategoryID) });
      transaction.update(docRef, { [`subcategories.list.${subcategoryID}`]: subcategory });
      return { categoryID: categoryID, subcategoryID: subcategoryID, subcategory };
    }).catch((error) => {
      return rejectWithValue(getErrorMessage(error));
    });
  } else {
    return rejectWithValue('Вы не авторизованы');
  }
});

export const addAddSubCategoryExtraReducers = (builder: ActionReducerMapBuilder<CategoriesStateType>) => {
  builder
    .addCase(addSubCategory.pending, (_state, action) => {
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(true);
      if (action.meta.arg.setErrorMessage) action.meta.arg.setErrorMessage('');
    })
    .addCase(addSubCategory.fulfilled, (state, action) => {
      const subcategories = state.list[action.payload.categoryID].subcategories;
      subcategories.list[action.payload.subcategoryID] = action.payload.subcategory;
      subcategories.order.push(action.payload.subcategoryID);

      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(false);
      if (action.meta.arg.setErrorMessage) action.meta.arg.setErrorMessage('');
      if (action.meta.arg.onFulfilled) action.meta.arg.onFulfilled();
    })
    .addCase(addSubCategory.rejected, (_state, action) => {
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(false);
      if (action.meta.arg.setErrorMessage && action.payload !== undefined) action.meta.arg.setErrorMessage(action.payload);
      console.error('Ошибка добавления подкатегории:', action.payload);
    });
};

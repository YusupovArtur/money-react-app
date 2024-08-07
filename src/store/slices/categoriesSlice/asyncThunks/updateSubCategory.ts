import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { CategoriesStateType, SubcategoryUpdateType } from 'store/slices/categoriesSlice';
import { ResponseHooksType } from 'store/types/ResponseHooksType.ts';
import { getAuth } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from 'app/firebase.ts';
import { getErrorMessage } from 'store/helpers/getErrorMessage.ts';

export const updateSubCategory = createAsyncThunk<
  { categoryID: string; subcategoryID: string; subcategoryProps: SubcategoryUpdateType },
  { categoryID: string; subcategoryID: string; subcategoryProps: SubcategoryUpdateType } & ResponseHooksType,
  { rejectValue: string }
>('categories/updateSubCategory', async (props, { rejectWithValue }) => {
  const auth = getAuth();
  const { categoryID, subcategoryID, subcategoryProps } = props;

  if (auth.currentUser) {
    const user = auth.currentUser;
    const docRef = doc(db, 'users_data', user.uid, 'categories', categoryID);

    const updateData: Record<string, string> = {};
    Object.keys(subcategoryProps).forEach((key) => {
      if (subcategoryProps[key as keyof SubcategoryUpdateType] !== undefined) {
        updateData[`subcategories.list.${subcategoryID}.${key}`] = subcategoryProps[key as keyof SubcategoryUpdateType] as string;
      }
    });

    return await updateDoc(docRef, updateData)
      .then(() => {
        return { categoryID, subcategoryID, subcategoryProps };
      })
      .catch((error) => {
        return rejectWithValue(getErrorMessage(error.code));
      });
  } else {
    return rejectWithValue('Вы не авторизованы');
  }
});

export const addUpdateSubCategoryExtraReducers = (builder: ActionReducerMapBuilder<CategoriesStateType>) => {
  builder
    .addCase(updateSubCategory.pending, (_state, action) => {
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(true);
      if (action.meta.arg.setErrorMessage) action.meta.arg.setErrorMessage('');
    })
    .addCase(updateSubCategory.fulfilled, (state, action) => {
      state.list[action.payload.categoryID].subcategories.list[action.payload.subcategoryID] = {
        ...state.list[action.payload.categoryID].subcategories.list[action.payload.categoryID],
        ...action.payload.subcategoryProps,
      };

      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(false);
      if (action.meta.arg.setErrorMessage) action.meta.arg.setErrorMessage('');
      if (action.meta.arg.onFulfilled) action.meta.arg.onFulfilled();
    })
    .addCase(updateSubCategory.rejected, (_state, action) => {
      if (action.meta.arg.setIsLoading) action.meta.arg.setIsLoading(false);
      if (action.meta.arg.setErrorMessage && action.payload !== undefined) action.meta.arg.setErrorMessage(action.payload);
      console.error('Ошибка изменения подкатегории:', action.payload);
    });
};

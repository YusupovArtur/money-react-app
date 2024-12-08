import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ResponseStateType } from 'store';
import { CategoriesOrderedListType, CategoriesStateType, CategoryType } from 'store/slices/categoriesSlice';
// Extra Reducers
import { addDownloadCategoriesExtraReducers } from 'store/slices/categoriesSlice/asyncThunks/downloadCategories.ts';
import { addAddCategoryExtraReducers } from 'store/slices/categoriesSlice/asyncThunks/addCategory.ts';
import { addAddSubCategoryExtraReducers } from 'store/slices/categoriesSlice/asyncThunks/addSubCategory.ts';
import { addDeleteCategoryExtraReducers } from 'store/slices/categoriesSlice/asyncThunks/deleteCategory.ts';
import { addDeleteSubCategoryExtraReducers } from 'store/slices/categoriesSlice/asyncThunks/deleteSubCategory.ts';
import { addUpdateCategoryExtraReducers } from 'store/slices/categoriesSlice/asyncThunks/updateCategory.ts';
import { addUpdateSubCategoryExtraReducers } from 'store/slices/categoriesSlice/asyncThunks/updateSubCategory.ts';
import { addShiftCategoryExtraReducers } from 'store/slices/categoriesSlice/asyncThunks/shiftCategory.ts';
import { addShiftSubCategoryExtraReducers } from 'store/slices/categoriesSlice/asyncThunks/shiftSubCategory.ts';

const initialState: CategoriesStateType = {
  list: {},
  order: [],
  responseState: {
    isLoading: undefined,
    errorMessage: '',
  },
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,

  reducers: {
    setCategory(
      state,
      action: PayloadAction<{
        action: 'added' | 'modified' | 'removed';
        id: string;
        category: CategoryType;
      }>,
    ) {
      switch (action.payload.action) {
        case 'added':
          state.order.push(action.payload.id);
          state.list[action.payload.id] = action.payload.category;
          break;
        case 'modified':
          state.list[action.payload.id] = action.payload.category;
          break;
        case 'removed':
          delete state.list[action.payload.id];
          state.order = state.order.filter((id) => id !== action.payload.id);
      }
    },
    clearCategories(state) {
      state.list = {};
      state.order = [];
      state.responseState = { isLoading: false, errorMessage: 'Вы не авторизованы' };
    },
    setCategories(state, action: PayloadAction<CategoriesOrderedListType>) {
      state.list = action.payload.list;
      state.order = action.payload.order;
      state.responseState = { isLoading: false, errorMessage: '' };
    },
    setCategoriesResponseState(state, action: PayloadAction<ResponseStateType>) {
      state.responseState = action.payload;
      if (action.payload.errorMessage) console.error('Ошибка чтения категорий', action.payload.errorMessage);
    },
  },

  extraReducers: (builder) => {
    addDownloadCategoriesExtraReducers(builder);
    addAddCategoryExtraReducers(builder);
    addAddSubCategoryExtraReducers(builder);
    addDeleteCategoryExtraReducers(builder);
    addDeleteSubCategoryExtraReducers(builder);
    addUpdateCategoryExtraReducers(builder);
    addUpdateSubCategoryExtraReducers(builder);
    addShiftCategoryExtraReducers(builder);
    addShiftSubCategoryExtraReducers(builder);
  },
});

export const { setCategory, clearCategories, setCategories, setCategoriesResponseState } = categoriesSlice.actions;
export default categoriesSlice.reducer;

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { doc, getDoc, runTransaction } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from 'app/firebase.ts';
import {
  CATEGORIES_LIST_LAST_ITEM_ID,
  categoriesStateType,
  categoryAddType,
  categoryUpdateType,
  ErrorWithCode,
  serverResponseStatusHooks,
  SUBCATEGORIES_LIST_LAST_ITEM_ID,
  subcategoryAddType,
  subcategoryType,
  subcategoryUpdateType,
} from 'store/types.ts';
import { generateID } from 'store/functions.ts';
import getErrorMessage from 'store/helpers/getErrorMessage.ts';

const initialState: categoriesStateType = {
  list: [],
};

export const downloadCategories = createAsyncThunk<categoriesStateType | void, serverResponseStatusHooks>(
  'categories/downloadCategories',
  async (props) => {
    const auth = getAuth();
    const { setIsLoading, setErrorMessage, onFulfilled } = props;
    if (setErrorMessage) setErrorMessage('');
    if (setIsLoading) setIsLoading(true);
    if (auth.currentUser) {
      const userID = auth.currentUser.uid;
      return await getDoc(doc(db, 'users_data', userID, 'categories', 'list'))
        .then((querySnapshot) => {
          if (querySnapshot.exists()) {
            if (setIsLoading) setIsLoading(false);
            if (onFulfilled) onFulfilled();
            return (querySnapshot.data() ? querySnapshot.data() : { list: [] }) as categoriesStateType;
          } else {
            throw new ErrorWithCode('Документ categories не существует');
          }
        })
        .catch((error) => {
          console.error('Ошибка чтения категорий:', error.code);
          if (setErrorMessage) setErrorMessage(getErrorMessage(error.code));
          if (setIsLoading) setIsLoading(false);
        });
    } else {
      if (setErrorMessage) setErrorMessage('Вы не авторизованы');
      if (setIsLoading) setIsLoading(false);
    }
  },
);

export const addCategory = createAsyncThunk<
  categoriesStateType | void,
  serverResponseStatusHooks & { category: categoryAddType }
>('categories/addCategory', async (props) => {
  const auth = getAuth();
  const { category, setIsLoading, setErrorMessage, onFulfilled } = props;
  if (setErrorMessage) setErrorMessage('');
  if (setIsLoading) setIsLoading(true);
  return await runTransaction(db, async (transaction) => {
    if (auth.currentUser) {
      if (category.name) {
        const categoriesRef = doc(db, 'users_data', auth.currentUser.uid, 'categories', 'list');
        const categoriesSnapshot = await transaction.get(categoriesRef);
        if (categoriesSnapshot.exists()) {
          const categoriesState = (categoriesSnapshot.data() ? categoriesSnapshot.data() : { list: [] }) as categoriesStateType;
          categoriesState.list.push({ ...category, id: generateID(20), subcategories: [] });
          transaction.set(categoriesRef, categoriesState);
          return categoriesState;
        } else {
          const categoriesState: categoriesStateType = { list: [{ ...category, id: generateID(20), subcategories: [] }] };
          transaction.set(categoriesRef, categoriesState);
          return categoriesState;
        }
      } else throw new ErrorWithCode('Вы не ввели имя категории');
    } else throw new ErrorWithCode('Вы не авторизованы');
  })
    .then((categoriesState) => {
      if (setIsLoading) setIsLoading(false);
      if (onFulfilled) onFulfilled();
      return categoriesState;
    })
    .catch((error) => {
      console.error('Ошибка записи подкатегории:', error.code);
      if (setErrorMessage) setErrorMessage(getErrorMessage(error.code));
      if (setIsLoading) setIsLoading(false);
    });
});

export const addSubCategory = createAsyncThunk<
  categoriesStateType | void,
  serverResponseStatusHooks & { categoryID: string; subcategory: subcategoryAddType }
>('categories/addSubCategory', async (props) => {
  const auth = getAuth();
  const { categoryID, subcategory, setIsLoading, setErrorMessage, onFulfilled } = props;
  if (setErrorMessage) setErrorMessage('');
  if (setIsLoading) setIsLoading(true);
  return await runTransaction(db, async (transaction) => {
    if (auth.currentUser) {
      const subcategoryID = generateID(20);
      const subcategoryToAdd: subcategoryType = { id: subcategoryID, ...subcategory };
      const categoriesRef = doc(db, 'users_data', auth.currentUser.uid, 'categories', 'list');
      const categoriesState = (await transaction.get(categoriesRef)).data() as categoriesStateType;
      categoriesState.list.forEach((category) => {
        if (category.id === categoryID) category.subcategories.push(subcategoryToAdd);
      });
      transaction.set(categoriesRef, categoriesState);
      return categoriesState;
    } else throw new ErrorWithCode('Вы не авторизованы');
  })
    .then((categoriesState) => {
      if (setIsLoading) setIsLoading(false);
      if (onFulfilled) onFulfilled();
      return categoriesState;
    })
    .catch((error) => {
      console.error('Ошибка записи подкатегории:', error.code);
      if (setErrorMessage) setErrorMessage(getErrorMessage(error.code));
      if (setIsLoading) setIsLoading(false);
    });
});

export const deleteCategory = createAsyncThunk<categoriesStateType | void, serverResponseStatusHooks & { categoryID: string }>(
  'categories/deleteCategory',
  async (props) => {
    const auth = getAuth();
    const { categoryID, setIsLoading, setErrorMessage, onFulfilled } = props;
    if (setErrorMessage) setErrorMessage('');
    if (setIsLoading) setIsLoading(true);
    return await runTransaction(db, async (transaction) => {
      if (auth.currentUser) {
        const categoriesRef = doc(db, 'users_data', auth.currentUser.uid, 'categories', 'list');
        const categoriesState = (await transaction.get(categoriesRef)).data() as categoriesStateType;
        categoriesState.list = categoriesState.list.filter((category) => category.id !== categoryID);
        transaction.set(categoriesRef, categoriesState);
        return categoriesState;
      } else throw new ErrorWithCode('Вы не авторизованы');
    })
      .then((categoriesState) => {
        if (setIsLoading) setIsLoading(false);
        if (onFulfilled) onFulfilled();
        return categoriesState;
      })
      .catch((error) => {
        console.error('Ошибка удаления категории:', error.code);
        if (setErrorMessage) setErrorMessage(getErrorMessage(error.code));
        if (setIsLoading) setIsLoading(false);
      });
  },
);

export const deleteSubCategory = createAsyncThunk<
  categoriesStateType | void,
  serverResponseStatusHooks & { categoryID: string; subcategoryID: string }
>('categories/deleteSubCategory', async (props) => {
  const auth = getAuth();
  const { categoryID, subcategoryID, setIsLoading, setErrorMessage, onFulfilled } = props;
  if (setErrorMessage) setErrorMessage('');
  if (setIsLoading) setIsLoading(true);
  return await runTransaction(db, async (transaction) => {
    if (auth.currentUser) {
      const categoriesRef = doc(db, 'users_data', auth.currentUser.uid, 'categories', 'list');
      const categoriesState = (await transaction.get(categoriesRef)).data() as categoriesStateType;
      categoriesState.list.forEach((category) => {
        if (category.id === categoryID) {
          category.subcategories = category.subcategories.filter((subcategory) => subcategory.id !== subcategoryID);
        }
      });
      transaction.set(categoriesRef, categoriesState);
      return categoriesState;
    } else throw new ErrorWithCode('Вы не авторизованы');
  })
    .then((categoriesState) => {
      if (setIsLoading) setIsLoading(false);
      if (onFulfilled) onFulfilled();
      return categoriesState;
    })
    .catch((error) => {
      console.error('Ошибка удаления подкатегории:', error.code);
      if (setErrorMessage) setErrorMessage(getErrorMessage(error.code));
      if (setIsLoading) setIsLoading(false);
    });
});

export const shiftCategory = createAsyncThunk<
  categoriesStateType | void,
  serverResponseStatusHooks & { categoryID: string; newIndexID: string }
>('categories/shiftCategory', async (props) => {
  const auth = getAuth();
  const { categoryID, newIndexID, setIsLoading, setErrorMessage, onFulfilled } = props;
  if (setErrorMessage) setErrorMessage('');
  if (setIsLoading) setIsLoading(true);
  return await runTransaction(db, async (transaction) => {
    if (auth.currentUser) {
      if (categoryID !== newIndexID) {
        const categoriesRef = doc(db, 'users_data', auth.currentUser.uid, 'categories', 'list');
        const categoriesState = (await transaction.get(categoriesRef)).data() as categoriesStateType;
        const shiftableCategoryIndex = categoriesState.list.findIndex((category) => category.id === categoryID);

        if (shiftableCategoryIndex > -1) {
          const shiftableCategory = categoriesState.list.splice(shiftableCategoryIndex, 1)[0];
          if (newIndexID === CATEGORIES_LIST_LAST_ITEM_ID) {
            categoriesState.list.push(shiftableCategory);
            transaction.set(categoriesRef, categoriesState);
            return categoriesState;
          } else {
            const newIndex = categoriesState.list.findIndex((category) => category.id === newIndexID);
            if (newIndex > -1) {
              categoriesState.list.splice(newIndex, 0, shiftableCategory);
              transaction.set(categoriesRef, categoriesState);
              return categoriesState;
            }
          }
        } else throw new ErrorWithCode('Категория с данным ID не существует');
      }
    } else throw new ErrorWithCode('Вы не авторизованы');
  })
    .then((categoriesState) => {
      if (setIsLoading) setIsLoading(false);
      if (onFulfilled) onFulfilled();
      return categoriesState;
    })
    .catch((error) => {
      console.error('Ошибка перемещения категории:', error.code);
      if (setErrorMessage) setErrorMessage(getErrorMessage(error.code));
      if (setIsLoading) setIsLoading(false);
    });
});

export const shiftSubCategory = createAsyncThunk<
  categoriesStateType | void,
  serverResponseStatusHooks & { categoryID: string; subcategoryID: string; newIndexID: string }
>('categories/shiftSubCategory', async (props) => {
  const auth = getAuth();
  const { categoryID, subcategoryID, newIndexID, setIsLoading, setErrorMessage, onFulfilled } = props;
  if (setErrorMessage) setErrorMessage('');
  if (setIsLoading) setIsLoading(true);
  return await runTransaction(db, async (transaction) => {
    if (auth.currentUser) {
      if (subcategoryID !== newIndexID) {
        const categoriesRef = doc(db, 'users_data', auth.currentUser.uid, 'categories', 'list');
        const categoriesState = (await transaction.get(categoriesRef)).data() as categoriesStateType;
        const shiftableCategoryIndex = categoriesState.list.findIndex((category) => category.id === categoryID);

        if (shiftableCategoryIndex > -1) {
          const shiftableSubcategories = categoriesState.list[shiftableCategoryIndex].subcategories;
          const shiftableSubcategoryIndex = shiftableSubcategories.findIndex((category) => category.id === subcategoryID);

          if (shiftableSubcategoryIndex > -1) {
            const shiftableSubcategory = shiftableSubcategories.splice(shiftableSubcategoryIndex, 1)[0];
            if (newIndexID === SUBCATEGORIES_LIST_LAST_ITEM_ID) {
              shiftableSubcategories.push(shiftableSubcategory);
              transaction.set(categoriesRef, categoriesState);
              return categoriesState;
            } else {
              const newIndex = shiftableSubcategories.findIndex((subcategory) => subcategory.id === newIndexID);
              shiftableSubcategories.splice(newIndex, 0, shiftableSubcategory);
              transaction.set(categoriesRef, categoriesState);
              return categoriesState;
            }
          } else throw new ErrorWithCode('Подкатегория с данным ID не существует');
        } else throw new ErrorWithCode('Категория с данным ID не существует');
      }
    } else throw new ErrorWithCode('Вы не авторизованы');
  })
    .then((categoriesState) => {
      if (setIsLoading) setIsLoading(false);
      if (onFulfilled) onFulfilled();
      return categoriesState;
    })
    .catch((error) => {
      console.error('Ошибка перемещения подкатегории:', error.code);
      if (setErrorMessage) setErrorMessage(getErrorMessage(error.code));
      if (setIsLoading) setIsLoading(false);
    });
});

export const updateCategory = createAsyncThunk<
  categoriesStateType | void,
  serverResponseStatusHooks & { categoryID: string; newProps: categoryUpdateType }
>('categories/updateCategory', async (props) => {
  const auth = getAuth();
  const { categoryID, newProps, setIsLoading, setErrorMessage, onFulfilled } = props;
  if (setErrorMessage) setErrorMessage('');
  if (setIsLoading) setIsLoading(true);
  return await runTransaction(db, async (transaction) => {
    if (auth.currentUser) {
      const categoriesRef = doc(db, 'users_data', auth.currentUser.uid, 'categories', 'list');
      const categoriesState = (await transaction.get(categoriesRef)).data() as categoriesStateType;
      categoriesState.list.forEach((category, index) => {
        if (category.id === categoryID) categoriesState.list[index] = { ...category, ...newProps };
      });
      transaction.set(categoriesRef, categoriesState);
      return categoriesState;
    } else throw new ErrorWithCode('Вы не авторизованы');
  })
    .then((categoriesState) => {
      if (setIsLoading) setIsLoading(false);
      if (onFulfilled) onFulfilled();
      return categoriesState;
    })
    .catch((error) => {
      console.error('Ошибка обновления категории:', error.code);
      if (setErrorMessage) setErrorMessage(getErrorMessage(error.code));
      if (setIsLoading) setIsLoading(false);
    });
});

export const updateSubCategory = createAsyncThunk<
  categoriesStateType | void,
  serverResponseStatusHooks & { categoryID: string; subcategoryID: string; newProps: subcategoryUpdateType }
>('categories/updateSubCategory', async (props) => {
  const auth = getAuth();
  const { categoryID, subcategoryID, newProps, setIsLoading, setErrorMessage, onFulfilled } = props;
  if (setErrorMessage) setErrorMessage('');
  if (setIsLoading) setIsLoading(true);
  return await runTransaction(db, async (transaction) => {
    if (auth.currentUser) {
      const categoriesRef = doc(db, 'users_data', auth.currentUser.uid, 'categories', 'list');
      const categoriesState = (await transaction.get(categoriesRef)).data() as categoriesStateType;
      categoriesState.list.forEach((category, categoryIndex) => {
        if (category.id === categoryID)
          category.subcategories.forEach((subcategory, subcategoryIndex) => {
            if (subcategory.id === subcategoryID)
              categoriesState.list[categoryIndex].subcategories[subcategoryIndex] = {
                ...categoriesState.list[categoryIndex].subcategories[subcategoryIndex],
                ...newProps,
              };
          });
      });
      transaction.set(categoriesRef, categoriesState);
      return categoriesState;
    } else throw new ErrorWithCode('Вы не авторизованы');
  })
    .then((categoriesState) => {
      if (setIsLoading) setIsLoading(false);
      if (onFulfilled) onFulfilled();
      return categoriesState;
    })
    .catch((error) => {
      console.error('Ошибка обновления категории:', error.code);
      if (setErrorMessage) setErrorMessage(getErrorMessage(error.code));
      if (setIsLoading) setIsLoading(false);
    });
});

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,

  reducers: {
    clearCategories(state) {
      state.list = [];
    },
    setCategories(state, action: PayloadAction<categoriesStateType | undefined>) {
      if (action.payload && action.payload.list) state.list = action.payload.list;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(downloadCategories.fulfilled, (state, action) => {
        if (action.payload) state.list = action.payload.list;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        if (action.payload) state.list = action.payload.list;
      })
      .addCase(addSubCategory.fulfilled, (state, action) => {
        if (action.payload) state.list = action.payload.list;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        if (action.payload) state.list = action.payload.list;
      })
      .addCase(deleteSubCategory.fulfilled, (state, action) => {
        if (action.payload) state.list = action.payload.list;
      })
      .addCase(shiftCategory.fulfilled, (state, action) => {
        if (action.payload) state.list = action.payload.list;
      })
      .addCase(shiftSubCategory.fulfilled, (state, action) => {
        if (action.payload) state.list = action.payload.list;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        if (action.payload) state.list = action.payload.list;
      })
      .addCase(updateSubCategory.fulfilled, (state, action) => {
        if (action.payload) state.list = action.payload.list;
      });
  },
});

export const { clearCategories, setCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;

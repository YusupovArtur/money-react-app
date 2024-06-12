import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { doc, addDoc, getDocs, deleteDoc, collection, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../../firebase.ts';
import { operationsStateType, operationType, operationUpdateType, serverResponseStatusHooks } from 'store/types.ts';
import { getErrorMessage } from 'store/functions.ts';

const initialState: { list: operationsStateType } = {
  list: {},
};

export const downloadOperations = createAsyncThunk<operationsStateType | void, serverResponseStatusHooks>(
  'operations/downloadOperations',
  async (props) => {
    const auth = getAuth();
    const { setIsLoading, setErrorMessage, isOk } = props;
    if (setErrorMessage) setErrorMessage('');
    if (setIsLoading) setIsLoading(true);
    if (auth.currentUser) {
      return await getDocs(collection(db, 'users_data', auth.currentUser.uid, 'transactions'))
        .then((querySnapshot) => {
          const operations: operationsStateType = {};
          querySnapshot.forEach((doc) => (operations[doc.id] = doc.data() as operationType));
          if (setIsLoading) setIsLoading(false);
          if (isOk) isOk.current = true;
          return operations;
        })
        .catch((error) => {
          console.error('Ошибка чтения операций:', error.code);
          if (setErrorMessage) setErrorMessage(getErrorMessage(error.code));
          if (setIsLoading) setIsLoading(false);
          if (isOk) isOk.current = false;
        });
    } else {
      if (setErrorMessage) setErrorMessage('Вы не авторизованы');
      if (setIsLoading) setIsLoading(false);
      if (isOk) isOk.current = false;
    }
  },
);

export const addOperation = createAsyncThunk<
  { id: string; operation: operationType } | void,
  serverResponseStatusHooks & { operation: operationType }
>('operations/addOperation', async (props) => {
  const auth = getAuth();
  const { operation, setIsLoading, setErrorMessage, isOk } = props;
  if (setErrorMessage) setErrorMessage('');
  if (setIsLoading) setIsLoading(true);
  if (auth.currentUser) {
    return await addDoc(collection(db, 'users_data', auth.currentUser.uid, 'transactions'), operation)
      .then((doc) => {
        if (setIsLoading) setIsLoading(false);
        if (isOk) isOk.current = true;
        return { id: doc.id, operation: operation };
      })
      .catch((error) => {
        console.error('Ошибка записи операции:', error.code);
        if (setErrorMessage) setErrorMessage(getErrorMessage(error.code));
        if (setIsLoading) setIsLoading(false);
        if (isOk) isOk.current = false;
      });
  } else {
    if (setErrorMessage) setErrorMessage('Вы не авторизованы');
    if (setIsLoading) setIsLoading(false);
    if (isOk) isOk.current = false;
  }
});

export const updateOperation = createAsyncThunk<
  { id: string; newOperationProps: operationUpdateType } | void,
  serverResponseStatusHooks & { id: string; newOperationProps: operationUpdateType }
>('operations/updateOperation', async (props) => {
  const auth = getAuth();
  const { id, newOperationProps, setIsLoading, setErrorMessage, isOk } = props;
  if (setErrorMessage) setErrorMessage('');
  if (setIsLoading) setIsLoading(true);
  if (auth.currentUser) {
    return await updateDoc(doc(db, 'users_data', auth.currentUser.uid, 'transactions', id), newOperationProps)
      .then(() => {
        if (setIsLoading) setIsLoading(false);
        if (isOk) isOk.current = true;
        return { id: id, newOperationProps: newOperationProps };
      })
      .catch((error) => {
        console.error('Ошибка изменения операции:', error.code);
        if (setErrorMessage) setErrorMessage(getErrorMessage(error.code));
        if (setIsLoading) setIsLoading(false);
        if (isOk) isOk.current = false;
      });
  } else {
    if (setErrorMessage) setErrorMessage('Вы не авторизованы');
    if (setIsLoading) setIsLoading(false);
    if (isOk) isOk.current = false;
  }
});

export const deleteOperation = createAsyncThunk<string | void, serverResponseStatusHooks & { id: string }>(
  'operations/deleteOperation',
  async (props) => {
    const auth = getAuth();
    const { id, setIsLoading, setErrorMessage, isOk } = props;
    if (setErrorMessage) setErrorMessage('');
    if (setIsLoading) setIsLoading(true);
    if (auth.currentUser) {
      return await deleteDoc(doc(db, 'users_data', auth.currentUser.uid, 'transactions', id))
        .then(() => {
          if (setIsLoading) setIsLoading(false);
          if (isOk) isOk.current = true;
          return id;
        })
        .catch((error) => {
          console.error('Ошибка удаления операции:', error.code);
          if (setErrorMessage) setErrorMessage(getErrorMessage(error.code));
          if (setIsLoading) setIsLoading(false);
          if (isOk) isOk.current = false;
        });
    } else {
      if (setErrorMessage) setErrorMessage('Вы не авторизованы');
      if (setIsLoading) setIsLoading(false);
      if (isOk) isOk.current = false;
    }
  },
);

const operationsSlice = createSlice({
  name: 'operations',
  initialState,

  reducers: {
    cleareOperations(state) {
      state.list = {};
    },
    setOperations(state, action: PayloadAction<operationsStateType>) {
      state.list = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(downloadOperations.fulfilled, (state, action) => {
        if (action.payload) state.list = action.payload;
      })
      .addCase(addOperation.fulfilled, (state, action) => {
        if (action.payload) state.list[action.payload.id] = action.payload.operation;
      })
      .addCase(updateOperation.fulfilled, (state, action) => {
        if (action.payload) {
          state.list[action.payload.id] = { ...state.list[action.payload.id], ...action.payload.newOperationProps };
        }
      })
      .addCase(deleteOperation.fulfilled, (state, action) => {
        if (action.payload) delete state.list[action.payload];
      });
  },
});

export const { cleareOperations, setOperations } = operationsSlice.actions;
export default operationsSlice.reducer;

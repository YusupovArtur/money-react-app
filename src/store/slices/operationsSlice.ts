import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { doc, addDoc, deleteDoc, collection, updateDoc, runTransaction, deleteField, FieldValue } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../../firebase.ts';
import {
  ErrorWithCode,
  operationsStateType,
  operationType,
  operationUpdateType,
  serverResponseStatusHooks,
} from 'store/types.ts';
import { generateID, getErrorMessage } from 'store/functions.ts';

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
    return await runTransaction(db, async (transaction) => {
      if (auth.currentUser) {
        const operationsRef = doc(db, 'users_data', auth.currentUser.uid, 'transactions', 'list');
        const operationsSnapshot = await transaction.get(operationsRef);
        if (operationsSnapshot.exists()) {
          return (operationsSnapshot.data() ? operationsSnapshot.data() : {}) as operationsStateType;
        } else {
          transaction.set(operationsRef, {});
          return {};
        }
      } else throw new ErrorWithCode('Вы не авторизованы');
    })
      .then((operations) => {
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
    // if (auth.currentUser) {
    //   return await getDocs(collection(db, 'users_data', auth.currentUser.uid, 'transactions'))
    //     .then((querySnapshot) => {
    //       const operations: operationsStateType = {};
    //       querySnapshot.forEach((doc) => (operations[doc.id] = doc.data() as operationType));
    //       if (setIsLoading) setIsLoading(false);
    //       if (isOk) isOk.current = true;
    //       return operations;
    //     })
    //     .catch((error) => {
    //       console.error('Ошибка чтения операций:', error.code);
    //       if (setErrorMessage) setErrorMessage(getErrorMessage(error.code));
    //       if (setIsLoading) setIsLoading(false);
    //       if (isOk) isOk.current = false;
    //     });
    // } else {
    //   if (setErrorMessage) setErrorMessage('Вы не авторизованы');
    //   if (setIsLoading) setIsLoading(false);
    //   if (isOk) isOk.current = false;
    // }
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
    const id = generateID(20);
    const operationToAdd: operationsStateType = {};
    operationToAdd[id] = operation;
    return await updateDoc(doc(db, 'users_data', auth.currentUser.uid, 'transactions', 'list'), operationToAdd)
      .then(() => {
        if (setIsLoading) setIsLoading(false);
        if (isOk) isOk.current = true;
        return { id: id, operation: operation };
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
  { id: string; operation: operationUpdateType } | void,
  serverResponseStatusHooks & { id: string; operation: operationUpdateType }
>('operations/updateOperation', async (props) => {
  const auth = getAuth();
  const { id, operation, setIsLoading, setErrorMessage, isOk } = props;
  if (setErrorMessage) setErrorMessage('');
  if (setIsLoading) setIsLoading(true);
  if (auth.currentUser) {
    const operatonToUpdate: { [key: string]: number | string } = {};
    if (operation.sum !== undefined) operatonToUpdate[`${id}.sum`] = operation.sum;
    if (operation.time !== undefined) operatonToUpdate[`${id}.time`] = operation.time;
    if (operation.type !== undefined) operatonToUpdate[`${id}.type`] = operation.type;
    if (operation.fromWallet !== undefined) operatonToUpdate[`${id}.fromWallet`] = operation.fromWallet;
    if (operation.toWallet !== undefined) operatonToUpdate[`${id}.toWallet`] = operation.toWallet;
    if (operation.category !== undefined) operatonToUpdate[`${id}.category`] = operation.category;
    if (operation.subcategory !== undefined) operatonToUpdate[`${id}.subcategory`] = operation.subcategory;
    if (operation.description !== undefined) operatonToUpdate[`${id}.description`] = operation.description;
    return await updateDoc(doc(db, 'users_data', auth.currentUser.uid, 'transactions', 'list'), operatonToUpdate)
      .then(() => {
        if (setIsLoading) setIsLoading(false);
        if (isOk) isOk.current = true;
        return { id: id, operation: operation };
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
      const operationToDelete: { [key: string]: FieldValue } = {};
      operationToDelete[id] = deleteField();
      return await updateDoc(doc(db, 'users_data', auth.currentUser.uid, 'transactions', 'list'), operationToDelete)
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
          state.list[action.payload.id] = { ...state.list[action.payload.id], ...action.payload.operation };
        }
      })
      .addCase(deleteOperation.fulfilled, (state, action) => {
        if (action.payload) delete state.list[action.payload];
      });
  },
});

export const { cleareOperations, setOperations } = operationsSlice.actions;
export default operationsSlice.reducer;

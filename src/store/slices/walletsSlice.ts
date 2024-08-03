import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { doc, getDoc, runTransaction } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from 'app/firebase';
import {
  ErrorWithCode,
  serverResponseStatusHooks,
  walletAddType,
  WALLETS_LIST_LAST_ITEM_ID,
  walletsStateType,
  walletUpdateType,
} from 'store/types';
import { generateID } from 'store/functions';
import getErrorMessage from 'store/helpers/getErrorMessage';

const initialState: walletsStateType = {
  list: [],
};

export const downloadWallets = createAsyncThunk<walletsStateType | void, serverResponseStatusHooks>(
  'wallets/downloadWallets',
  async (props) => {
    const auth = getAuth();
    const { setIsLoading, setErrorMessage, onFulfilled } = props;
    if (setErrorMessage) setErrorMessage('');
    if (setIsLoading) setIsLoading(true);
    if (auth.currentUser) {
      return await getDoc(doc(db, 'users_data', auth.currentUser.uid, 'wallets', 'list'))
        .then((querySnapshot) => {
          if (querySnapshot.exists()) {
            if (setIsLoading) setIsLoading(false);
            if (onFulfilled) onFulfilled();
            return (querySnapshot.data() ? querySnapshot.data() : { list: [] }) as walletsStateType;
          } else {
            throw new ErrorWithCode('Документ wallets не существует');
          }
        })
        .catch((error) => {
          console.error('Ошибка чтения счетов:', error.code);
          if (setErrorMessage) setErrorMessage(getErrorMessage(error.code));
          if (setIsLoading) setIsLoading(false);
        });
    } else {
      if (setErrorMessage) setErrorMessage('Вы не авторизованы');
      if (setIsLoading) setIsLoading(false);
    }
  },
);

export const addWallet = createAsyncThunk<
  walletsStateType | void,
  serverResponseStatusHooks & {
    wallet: walletAddType;
  }
>('wallets/addWallet', async (props) => {
  const auth = getAuth();
  const { wallet, setIsLoading, setErrorMessage, onFulfilled } = props;
  if (setErrorMessage) setErrorMessage('');
  if (setIsLoading) setIsLoading(true);
  return await runTransaction(db, async (transaction) => {
    if (auth.currentUser) {
      if (wallet.name) {
        if (wallet.balance || wallet.balance === 0) {
          const walletsRef = doc(db, 'users_data', auth.currentUser.uid, 'wallets', 'list');
          const walletSnapshot = await transaction.get(walletsRef);
          if (walletSnapshot.exists()) {
            const walletsState = (walletSnapshot.data() ? walletSnapshot.data() : { list: [] }) as walletsStateType;
            walletsState.list.push({ ...wallet, id: generateID(20) });
            transaction.set(walletsRef, walletsState);
            return walletsState;
          } else {
            const walletsState = { list: [{ ...wallet, id: generateID(20) }] };
            transaction.set(walletsRef, walletsState);
            return walletsState;
          }
        } else throw new ErrorWithCode('Вы не ввели баланс на счете');
      } else throw new ErrorWithCode('Вы не ввели имя счета');
    } else throw new ErrorWithCode('Вы не авторизованы');
  })
    .then((walletsState) => {
      if (setIsLoading) setIsLoading(false);
      if (onFulfilled) onFulfilled();
      return walletsState;
    })
    .catch((error) => {
      console.error('Ошибка добавления счета счета:', error.code);
      if (setErrorMessage) setErrorMessage(getErrorMessage(error.code));
      if (setIsLoading) setIsLoading(false);
    });
});

export const deleteWallet = createAsyncThunk<walletsStateType | void, serverResponseStatusHooks & { walletID: string }>(
  'wallets/deleteWallet',
  async (props) => {
    const auth = getAuth();
    const { walletID, setIsLoading, setErrorMessage, onFulfilled } = props;
    if (setErrorMessage) setErrorMessage('');
    if (setIsLoading) setIsLoading(true);
    return await runTransaction(db, async (transaction) => {
      if (auth.currentUser) {
        const walletsRef = doc(db, 'users_data', auth.currentUser.uid, 'wallets', 'list');
        const walletsState = (await transaction.get(walletsRef)).data() as walletsStateType;
        walletsState.list = walletsState.list.filter((wallet) => wallet.id !== walletID);
        transaction.set(walletsRef, walletsState);
        return walletsState;
      } else throw new ErrorWithCode('Вы не авторизованы');
    })
      .then((walletsState) => {
        if (setIsLoading) setIsLoading(false);
        if (onFulfilled) onFulfilled();
        return walletsState;
      })
      .catch((error) => {
        console.error('Ошибка удаления счета:', error.code);
        if (setErrorMessage) setErrorMessage(getErrorMessage(error.code));
        if (setIsLoading) setIsLoading(false);
      });
  },
);

export const shiftWallet = createAsyncThunk<
  walletsStateType | void,
  serverResponseStatusHooks & { walletID: string; newIndexID: string }
>('wallets/shiftWallet', async (props) => {
  const auth = getAuth();
  const { walletID, newIndexID, setIsLoading, setErrorMessage, onFulfilled } = props;
  if (setErrorMessage) setErrorMessage('');
  if (setIsLoading) setIsLoading(true);
  return await runTransaction(db, async (transaction) => {
    if (auth.currentUser) {
      if (walletID !== newIndexID) {
        const walletsRef = doc(db, 'users_data', auth.currentUser.uid, 'wallets', 'list');
        const walletsState = (await transaction.get(walletsRef)).data() as walletsStateType;
        const shiftableWalletIndex = walletsState.list.findIndex((wallet) => wallet.id === walletID);

        if (shiftableWalletIndex > -1) {
          const shiftableWallet = walletsState.list.splice(shiftableWalletIndex, 1)[0];
          if (newIndexID === WALLETS_LIST_LAST_ITEM_ID) {
            walletsState.list.push(shiftableWallet);
            transaction.set(walletsRef, walletsState);
            return walletsState;
          } else {
            const newIndex = walletsState.list.findIndex((wallet) => wallet.id === newIndexID);
            if (newIndex > -1) {
              walletsState.list.splice(newIndex, 0, shiftableWallet);
              transaction.set(walletsRef, walletsState);
              return walletsState;
            } else throw new ErrorWithCode('Счета с даннымы ID не существуют');
          }
        } else throw new ErrorWithCode('Счета с даннымы ID не существуют');
      }
    } else throw new ErrorWithCode('Вы не авторизованы');
  })
    .then((walletsState) => {
      if (setIsLoading) setIsLoading(false);
      if (onFulfilled) onFulfilled();
      return walletsState;
    })
    .catch((error) => {
      console.error('Ошибка перемещения счета:', error.code);
      if (setErrorMessage) setErrorMessage(getErrorMessage(error.code));
      if (setIsLoading) setIsLoading(false);
    });
});

export const updateWallet = createAsyncThunk<
  walletsStateType | void,
  serverResponseStatusHooks & { walletID: string; newProps: walletUpdateType }
>('wallets/updateWallet', async (props) => {
  const auth = getAuth();
  const { walletID, newProps, setIsLoading, setErrorMessage, onFulfilled } = props;
  if (setErrorMessage) setErrorMessage('');
  if (setIsLoading) setIsLoading(true);
  return await runTransaction(db, async (transaction) => {
    if (auth.currentUser) {
      if (newProps.name) {
        if (newProps.balance || newProps.balance === 0 || newProps.balance === undefined) {
          const walletsRef = doc(db, 'users_data', auth.currentUser.uid, 'wallets', 'list');
          const walletsState = (await transaction.get(walletsRef)).data() as walletsStateType;
          walletsState.list.forEach((wallet, index) => {
            if (wallet.id === walletID) walletsState.list[index] = { ...wallet, ...newProps };
          });
          transaction.set(walletsRef, walletsState);
          return walletsState;
        } else throw new ErrorWithCode('Вы не ввели баланс на счете');
      } else throw new ErrorWithCode('Вы не ввели имя счета');
    } else throw new ErrorWithCode('Вы не авторизованы');
  })
    .then((walletsState) => {
      if (setIsLoading) setIsLoading(false);
      if (onFulfilled) onFulfilled();
      return walletsState;
    })
    .catch((error) => {
      console.error('Ошибка обновления счета:', error.code);
      if (setErrorMessage) setErrorMessage(getErrorMessage(error.code));
      if (setIsLoading) setIsLoading(false);
    });
});

const walletSlice = createSlice({
  name: 'wallets',
  initialState,

  reducers: {
    clearWallets(state) {
      state.list = [];
    },
    setWallets(state, action: PayloadAction<walletsStateType | undefined>) {
      if (action.payload && action.payload.list) state.list = action.payload.list;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(downloadWallets.fulfilled, (state, action) => {
        if (action.payload) state.list = action.payload.list;
      })
      .addCase(addWallet.fulfilled, (state, action) => {
        if (action.payload) state.list = action.payload.list;
      })
      .addCase(shiftWallet.fulfilled, (state, action) => {
        if (action.payload) state.list = action.payload.list;
      })
      .addCase(updateWallet.fulfilled, (state, action) => {
        if (action.payload) state.list = action.payload.list;
      });
  },
});

export const { clearWallets, setWallets } = walletSlice.actions;
export default walletSlice.reducer;

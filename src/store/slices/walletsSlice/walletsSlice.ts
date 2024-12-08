import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponseStateType } from 'store/index.ts';
import { WalletsOrderedListType, WalletsStateType } from 'store/slices/walletsSlice';
import { addDownloadWalletsExtraReducers } from 'store/slices/walletsSlice/asyncThunks/downloadWallets.ts';
import { addAddWalletExtraReducers } from 'store/slices/walletsSlice/asyncThunks/addWallet.ts';
import { addDeleteWalletExtraReducers } from 'store/slices/walletsSlice/asyncThunks/deleteWallet.ts';
import { addUpdateWalletExtraReducers } from 'store/slices/walletsSlice/asyncThunks/updateWallet.ts';
import { addShiftWalletExtraReducers } from 'store/slices/walletsSlice/asyncThunks/shiftWallet.ts';

const initialState: WalletsStateType = {
  list: {},
  order: [],
  responseState: {
    isLoading: undefined,
    errorMessage: '',
  },
};

const walletSlice = createSlice({
  name: 'wallets',
  initialState,

  reducers: {
    clearWallets(state) {
      state.list = {};
      state.order = [];
      state.responseState = { isLoading: false, errorMessage: 'Вы не авторизованы' };
    },
    setWallets(state, action: PayloadAction<WalletsOrderedListType>) {
      state.list = action.payload.list;
      state.order = action.payload.order;
      state.responseState = { isLoading: false, errorMessage: '' };
    },
    setWalletsResponseState(state, action: PayloadAction<ResponseStateType>) {
      state.responseState = action.payload;
      if (action.payload.errorMessage) console.error('Ошибка чтения транзакций', action.payload.errorMessage);
    },
  },

  extraReducers: (builder) => {
    addDownloadWalletsExtraReducers(builder);
    addAddWalletExtraReducers(builder);
    addDeleteWalletExtraReducers(builder);
    addUpdateWalletExtraReducers(builder);
    addShiftWalletExtraReducers(builder);
  },
});

export const { clearWallets, setWallets, setWalletsResponseState } = walletSlice.actions;
export default walletSlice.reducer;

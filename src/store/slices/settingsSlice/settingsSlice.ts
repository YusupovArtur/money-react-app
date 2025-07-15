import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponseStateType } from 'store/index.ts';
import { SettingsStateType } from 'store/slices/settingsSlice/types/SettingsStateType.ts';
import { SettingsType } from 'store/slices/settingsSlice/types/SettingsType.ts';
import { addDownloadSettingsExtraReducers } from 'store/slices/settingsSlice/asyncThunks/downloadSettings.ts';
import { addChangeWalletsWidgetSettingsExtraReducers } from 'store/slices/settingsSlice/asyncThunks/changeWalletsWidgetSettings.ts';

const initialState: SettingsStateType = {
  settings: {
    widgetsSettings: {
      walletsWidget: {
        order: [],
      },
    },
  },
  responseState: {
    isLoading: undefined,
    errorMessage: '',
  },
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,

  reducers: {
    clearSettings(state) {
      state.settings = initialState.settings;
      state.responseState = { isLoading: false, errorMessage: 'Вы не авторизованы' };
    },
    setSettings(state, action: PayloadAction<SettingsType>) {
      state.settings = action.payload;
      state.responseState = { isLoading: false, errorMessage: '' };
    },
    setSettingsResponseState(state, action: PayloadAction<ResponseStateType>) {
      state.responseState = action.payload;
      if (action.payload.errorMessage) console.error('Ошибка чтения транзакций', action.payload.errorMessage);
    },
  },

  extraReducers: (builder) => {
    addDownloadSettingsExtraReducers(builder);
    addChangeWalletsWidgetSettingsExtraReducers(builder);
  },
});

export const { clearSettings, setSettings, setSettingsResponseState } = settingsSlice.actions;
export default settingsSlice.reducer;

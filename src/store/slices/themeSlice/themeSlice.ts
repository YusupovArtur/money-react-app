import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThemeDisplayType, ThemeModeType, ThemeStateType } from 'store/slices/themeSlice';

const initialState: ThemeStateType = {
  themeMode: 'auto',
  themeDisplay: 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeThemeMode(state, action: PayloadAction<ThemeModeType>) {
      state.themeMode = action.payload;
    },
    changeThemeDisplay(state, action: PayloadAction<ThemeDisplayType>) {
      state.themeDisplay = action.payload;
    },
  },
});

export const { changeThemeMode, changeThemeDisplay } = themeSlice.actions;
export default themeSlice.reducer;

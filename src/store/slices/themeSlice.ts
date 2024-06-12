import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: {
  themeMode: 'light' | 'dark' | 'auto';
  themeDisplay: 'light' | 'dark';
} = {
  themeMode: 'auto',
  themeDisplay: 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeThemeMode(state, action: PayloadAction<'light' | 'dark' | 'auto'>) {
      state.themeMode = action.payload;
    },
    changeThemeDisplay(state, action: PayloadAction<'light' | 'dark'>) {
      state.themeDisplay = action.payload;
    },
  },
});

export const { changeThemeMode, changeThemeDisplay } = themeSlice.actions;
export default themeSlice.reducer;

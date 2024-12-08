import { useEffect } from 'react';
import { changeThemeDisplay } from 'store/slices/themeSlice/themeSlice.ts';
import { useAppDispatch, useAppSelector } from 'store';
import { useMediaQuery } from 'shared/hooks';

export const useThemeAutoModeListener = () => {
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector((state) => state.theme.themeMode);
  const themeDisplay = useAppSelector((state) => state.theme.themeDisplay);

  const prefersDarkTheme = useMediaQuery('(prefers-color-scheme: dark)');
  useEffect(() => {
    if (themeMode === 'auto') {
      if (prefersDarkTheme) {
        dispatch(changeThemeDisplay('dark'));
      } else {
        dispatch(changeThemeDisplay('light'));
      }
    }
  }, [themeMode, prefersDarkTheme, dispatch]);

  useEffect(() => {
    document.body.setAttribute('data-bs-theme', themeDisplay);
  }, [themeDisplay]);
};

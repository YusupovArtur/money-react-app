import { useEffect } from 'react';
import { changeThemeDisplay } from 'store/slices/themeSlice/themeSlice.ts';
import { useAppDispatch, useAppSelector } from 'store/hook';

const useThemeAutoModeListener = () => {
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector((state) => state.theme.themeMode);
  const themeDisplay = useAppSelector((state) => state.theme.themeDisplay);

  const setAutoTheme = () => {
    if (themeMode === 'auto')
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        dispatch(changeThemeDisplay('dark'));
      } else {
        dispatch(changeThemeDisplay('light'));
      }
  };

  useEffect(() => {
    setAutoTheme();
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setAutoTheme);
    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', setAutoTheme);
    };
  }, []);

  useEffect(() => {
    document.body.setAttribute('data-bs-theme', themeDisplay);
  }, [themeDisplay]);
};

export default useThemeAutoModeListener;

import { useEffect } from 'react';
import { changeThemeDisplay } from 'store/slices/themeSlice';
import { useAppDispatch, useAppSelector } from 'store/hook';

const useThemeAutoModeListener = () => {
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector((state) => state.theme.themeMode);

  const setAutoTheme = () => {
    if (themeMode === 'auto')
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        dispatch(changeThemeDisplay('dark'));
        document.body.setAttribute('data-bs-theme', 'dark');
      } else {
        dispatch(changeThemeDisplay('light'));
        document.body.setAttribute('data-bs-theme', 'light');
      }
  };

  useEffect(() => {
    setAutoTheme();
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setAutoTheme);
    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', setAutoTheme);
    };
  }, []);
};

export default useThemeAutoModeListener;

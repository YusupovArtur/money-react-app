import { useEffect } from 'react';
import { changeThemeDisplay } from 'store/slices/themeSlice';
import { useAppDispatch, useAppSelector } from 'store/hook';

const useThemeAutoModeListener = () => {
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector((state) => state.theme.themeMode);

  // Theme event listener
  useEffect(() => {
    const setAutoTheme = () => {
      if (themeMode === 'auto')
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          dispatch(changeThemeDisplay('dark'));
        } else {
          dispatch(changeThemeDisplay('light'));
        }
    };

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setAutoTheme);
    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', setAutoTheme);
    };
  }, [themeMode]);
};

export default useThemeAutoModeListener;

import { FC } from 'react';
// Store imports
import { useAppDispatch, useAppSelector } from 'store/hook';
import { changeThemeDisplay, changeThemeMode } from 'store/slices/themeSlice';
// UI imports
import { ButtonWithIcon } from 'shared/ui';
import { LightThemeIcon } from 'features/ThemeToggle/icons/AutoThemeIcon';
import { DarkThemeIcon } from 'features/ThemeToggle/icons/DarkThemeIcon';
import { AutoThemeIcon } from 'features/ThemeToggle/icons/LightThemeIcon';
// Model
import useThemeAutoModeListener from './model/useThemeAutoModeListener';

const ThemeToggle: FC = () => {
  const themeMode: 'light' | 'dark' | 'auto' = useAppSelector((store) => store.theme.themeMode);
  const dispatch = useAppDispatch();
  const iconSize: string = '1.5rem';

  useThemeAutoModeListener();

  const setLight = () => {
    dispatch(changeThemeMode('light'));
    dispatch(changeThemeDisplay('light'));
  };
  const setDark = () => {
    dispatch(changeThemeMode('dark'));
    dispatch(changeThemeDisplay('dark'));
  };

  const setAuto = () => {
    dispatch(changeThemeMode('auto'));
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      dispatch(changeThemeDisplay('dark'));
    } else {
      dispatch(changeThemeDisplay('light'));
    }
  };

  const handleToggleClick = () => {
    if (themeMode === 'light') {
      setDark();
    } else if (themeMode === 'dark') {
      setAuto();
    } else {
      setLight();
    }
  };

  return (
    <ButtonWithIcon onClick={handleToggleClick} className="btn-body" style={{ padding: '0.375rem' }}>
      {themeMode === 'light' ? (
        <LightThemeIcon iconSize={iconSize} />
      ) : themeMode === 'dark' ? (
        <DarkThemeIcon iconSize={iconSize} />
      ) : (
        <AutoThemeIcon iconSize={iconSize} />
      )}
    </ButtonWithIcon>
  );
};

export default ThemeToggle;

import { FC } from 'react';
// Store
import { useAppDispatch, useAppSelector } from 'store';
import { changeThemeDisplay, changeThemeMode } from 'store/slices/themeSlice';
// UI
import { ButtonWithIcon } from 'shared/ui';
import { LightThemeIcon } from './icons/AutoThemeIcon';
import { DarkThemeIcon } from './icons/DarkThemeIcon';
import { AutoThemeIcon } from './icons/LightThemeIcon';
// Model
import { useThemeAutoModeListener } from './hooks/useThemeAutoModeListener';

export const ThemeToggle: FC<{ iconSize?: `${number}rem` }> = ({ iconSize = '1.5rem' }) => {
  const themeMode = useAppSelector((store) => store.theme.themeMode);
  const dispatch = useAppDispatch();

  // Theme mode change listener
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
    <ButtonWithIcon onClick={handleToggleClick} className="btn-body-tertiary" style={{ padding: '0.375rem' }}>
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

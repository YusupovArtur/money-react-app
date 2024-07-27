import { FC } from 'react';
// Store imports
import { useAppDispatch, useAppSelector } from 'store/hook.ts';
import { changeThemeDisplay, changeThemeMode } from 'store/slices/themeSlice.ts';
// UI imports
import { AutoThemeIcon, DarkThemeIcon, LightThemeIcon } from './ui/ThemeModeIcons.tsx';
import useThemeAutoModeListener from './model/useThemeAutoModeListener.ts';

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

  return (
    <div className="dropdown">
      <button
        type="button"
        className="btn btn-body dropdown-toggle d-flex justify-content-center align-items-center"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {themeMode === 'light' ? (
          <LightThemeIcon iconSize={iconSize} />
        ) : themeMode === 'dark' ? (
          <DarkThemeIcon iconSize={iconSize} />
        ) : (
          <AutoThemeIcon iconSize={iconSize} />
        )}
      </button>
      <ul style={{ minWidth: '4rem' }} className="dropdown-menu dropdown-menu-md-end">
        <li>
          <button className={`dropdown-item ${themeMode === 'light' && 'active'}`} onClick={setLight}>
            <LightThemeIcon iconSize={iconSize} />
            {' Светлая'}
          </button>
        </li>
        <li>
          <button className={`dropdown-item ${themeMode === 'dark' && 'active'}`} onClick={setDark}>
            <DarkThemeIcon iconSize={iconSize} />
            {' Темная'}
          </button>
        </li>
        <li>
          <button className={`dropdown-item ${themeMode === 'auto' && 'active'}`} onClick={setAuto}>
            <AutoThemeIcon iconSize={iconSize} />
            {' Авто'}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ThemeToggle;

import { FC } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hook.ts';
import { changeThemeDisplay, changeThemeMode } from 'store/slices/themeSlice';
import { ThemeIcon } from './icons_svg/IconsSVG.tsx';

const ThemeToggle: FC = () => {
  const themeMode: 'light' | 'dark' | 'auto' = useAppSelector((store) => store.theme.themeMode);
  const dispatch = useAppDispatch();
  const iconSize: string = '23px';

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
        className="btn dropdown-toggle text-body bg-body-tertiary d-flex justify-content-center align-items-center"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <ThemeIcon iconName={themeMode} iconSize={iconSize}></ThemeIcon>
      </button>
      <ul style={{ minWidth: '4rem' }} className="dropdown-menu dropdown-menu-md-end">
        <li>
          <button className={`dropdown-item ${themeMode === 'light' && 'active'}`} onClick={setLight}>
            <ThemeIcon iconName={'light'} iconSize={iconSize}></ThemeIcon>
            {' Светлая'}
          </button>
        </li>
        <li>
          <button className={`dropdown-item ${themeMode === 'dark' && 'active'}`} onClick={setDark}>
            <ThemeIcon iconName={'dark'} iconSize={iconSize}></ThemeIcon>
            {' Темная'}
          </button>
        </li>
        <li>
          <button className={`dropdown-item ${themeMode === 'auto' && 'active'}`} onClick={setAuto}>
            <ThemeIcon iconName={'auto'} iconSize={iconSize}></ThemeIcon>
            {' Авто'}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ThemeToggle;

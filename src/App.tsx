// React imports
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
// Store imports
import { useAppSelector, useAppDispatch } from 'store/hook';
import { exitUser, setUserState, cleareUserState } from 'store/slices/userSlice';
import { cleareOperations, downloadOperations } from 'store/slices/operationsSlice';
import { cleareWallets, downloadWallets } from 'store/slices/walletsSlice.js';
import { cleareCategories, downloadCategories } from 'store/slices/categoriesSlice';
import { changeThemeDisplay } from 'store/slices/themeSlice';
import { getUserState, operationsOnSnapshot, walletsOnSnapshot, categoriesOnSnapshot } from 'store/functions';
// Components
import Navbar from 'components/big_components/Navbar';
import MainPage from 'components/pages/main_page/MainPage';
import TransactionsPage from 'components/pages/transactions_page/TransactionsPage';
import SignInPage from 'components/pages/sign_in_up_pages/SignInPage';
import SignUpPage from 'components/pages/sign_in_up_pages/SignUpPage';
import WalletsPage from 'components/pages/wallets_page/WalletsPage';
import CategoriesPage from 'components/pages/categories_page/CategoriesPage';
import ProfilePage from 'components/pages/profile_page/ProfilePage';

function App(): React.ReactElement {
  const dispatch = useAppDispatch();
  const operationListener = new operationsOnSnapshot(dispatch);
  const walletsListener = new walletsOnSnapshot(dispatch);
  const categoriesListener = new categoriesOnSnapshot(dispatch);

  const isShouldRemember: boolean = useAppSelector((state) => state.user.isShouldRemember);
  const theme = useAppSelector((state) => state.theme);
  const auth = getAuth();

  // On app building
  useEffect(() => {
    dispatch(downloadOperations({}));
    dispatch(downloadWallets({}));
    dispatch(downloadCategories({}));
    return () => {
      operationListener.unsubscribe();
      walletsListener.unsubscribe();
      categoriesListener.unsubscribe();
      if (!isShouldRemember) dispatch(exitUser({}));
      else dispatch(cleareUserState());
    };
  }, []);

  // Firebase event listeners
  onAuthStateChanged(auth, (user) => {
    if (user) {
      operationListener.subscribe(user);
      walletsListener.subscribe(user);
      categoriesListener.subscribe(user);
      dispatch(setUserState(getUserState(user)));
    } else {
      operationListener.unsubscribe();
      walletsListener.unsubscribe();
      categoriesListener.unsubscribe();
      dispatch(cleareUserState());
      dispatch(cleareOperations());
      dispatch(cleareWallets());
      dispatch(cleareCategories());
    }
  });

  // Theme event listener
  const setAutoTheme = () => {
    if (theme.themeMode === 'auto')
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) dispatch(changeThemeDisplay('dark'));
      else dispatch(changeThemeDisplay('light'));
  };
  useEffect(() => {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setAutoTheme);
    return () => window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', setAutoTheme);
  }, [theme.themeMode]);

  return (
    <div
      onDragOver={(event) => event.preventDefault()}
      onDragEnter={(event) => event.preventDefault()}
      className="min-vh-100 bg-body-secondary d-flex flex-column"
      data-bs-theme={theme.themeDisplay}
    >
      <Navbar></Navbar>
      <div className="flex-grow-1 d-flex justify-content-center align-items-center">
        <Routes>
          <Route path={'/'} Component={MainPage} />
          <Route path={'/transactions'} Component={TransactionsPage} />
          <Route path={'/wallets'} Component={WalletsPage} />
          <Route path={'/categories'} Component={CategoriesPage} />
          <Route path={'/signin'} Component={SignInPage} />
          <Route path={'/signup'} Component={SignUpPage} />
          <Route path={'/profile'} Component={ProfilePage}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;

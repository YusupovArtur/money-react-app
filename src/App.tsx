// React imports
import { FC, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
// Store imports
import { useAppDispatch, useAppSelector } from 'store/hook.ts';
import { cleareUserState, exitUser, setUserState } from 'store/slices/userSlice.ts';
import { cleareOperations, downloadOperations } from 'store/slices/operationsSlice.ts';
import { cleareWallets, downloadWallets } from 'store/slices/walletsSlice.ts';
import { cleareCategories, downloadCategories } from 'store/slices/categoriesSlice.ts';
import { changeThemeDisplay } from 'store/slices/themeSlice.ts';
import { categoriesOnSnapshot, getUserState, operationsOnSnapshot, walletsOnSnapshot } from 'store/functions.ts';
// Components
import Navbar from 'components_legacy/big_components/Navbar.tsx';
import MainPage from 'components_legacy/pages/main_page/MainPage.tsx';
import TransactionsPage from 'components_legacy/pages/transactions_page/TransactionsPage.tsx';
import SignInPage from 'components_legacy/pages/sign_in_up_pages/SignInPage.tsx';
import SignUpPage from 'components_legacy/pages/sign_in_up_pages/SignUpPage.tsx';
import WalletsPage from 'components_legacy/pages/wallets_page/WalletsPage.tsx';
import CategoriesPage from 'components_legacy/pages/categories_page/CategoriesPage.tsx';
import ProfilePage from 'components_legacy/pages/profile_page/ProfilePage.tsx';

const App: FC = () => {
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
};

export default App;

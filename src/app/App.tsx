// React imports
import { FC, lazy, Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
// Store imports
import { useAppDispatch, useAppSelector } from 'store/hook';
import { clearUserState, getUserState, logoutUser, setUserState } from 'store/slices/userSlice';
import { cleareOperations, downloadOperations } from 'store/slices/operationsSlice';
import { cleareWallets, downloadWallets } from 'store/slices/walletsSlice';
import { cleareCategories, downloadCategories } from 'store/slices/categoriesSlice';
import { categoriesOnSnapshot, operationsOnSnapshot, walletsOnSnapshot } from 'store/functions';
// Components imports
import Navbar from 'widgets/Navbar';
import { PageLoadingSpinner } from 'shared/ui';
import AppWrapper from 'app/AppWrapper';

const MainPage = lazy(() => import('components_legacy/pages/main_page/MainPage.tsx'));
const TransactionsPage = lazy(() => import('components_legacy/pages/transactions_page/TransactionsPage.tsx'));
const WalletsPage = lazy(() => import('components_legacy/pages/wallets_page/WalletsPage.tsx'));
const CategoriesPage = lazy(() => import('components_legacy/pages/categories_page/CategoriesPage.tsx'));
const LoginPage = lazy(() => import('pages/LoginPage'));
const ProfilePage = lazy(() => import('pages/ProfilePage'));

const App: FC = () => {
  const dispatch = useAppDispatch();
  const operationListener = new operationsOnSnapshot(dispatch);
  const walletsListener = new walletsOnSnapshot(dispatch);
  const categoriesListener = new categoriesOnSnapshot(dispatch);

  const isShouldRemember: boolean = useAppSelector((state) => state.user.isShouldRemember);
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
      if (!isShouldRemember) dispatch(logoutUser({}));
      else dispatch(clearUserState());
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
      dispatch(clearUserState());
      dispatch(cleareOperations());
      dispatch(cleareWallets());
      dispatch(cleareCategories());
    }
  });

  return (
    <AppWrapper>
      <Navbar />
      <Suspense fallback={<PageLoadingSpinner />}>
        <Routes>
          <Route path={'/'} Component={MainPage} />
          <Route path={'/transactions'} Component={TransactionsPage} />
          <Route path={'/wallets'} Component={WalletsPage} />
          <Route path={'/categories'} Component={CategoriesPage} />
          <Route path={'/login'} Component={LoginPage} />
          <Route path={'/profile'} Component={ProfilePage} />
        </Routes>
      </Suspense>
    </AppWrapper>
  );
};

export default App;

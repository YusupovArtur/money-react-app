// React imports
import { FC, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
// Components imports
import { Navbar } from 'widgets/Navbar';
import { PageLoadingSpinner } from 'shared/ui';
import { AppWrapper } from 'app/AppWrapper';
import { useFirestoreChangesListener } from 'app/useFirestoreChangesListener.ts';
// Pages
const MainPage = lazy(() => import('components_legacy/pages/main_page/MainPage.tsx'));
const TransactionsPage = lazy(() => import('components_legacy/pages/transactions_page/TransactionsPage.tsx'));
const WalletsPage = lazy(() => import('components_legacy/pages/wallets_page/WalletsPage.tsx'));
const CategoriesPage = lazy(() => import('components_legacy/pages/categories_page/CategoriesPage.tsx'));
const LoginPage = lazy(() => import('pages/LoginPage'));
const ProfilePage = lazy(() => import('pages/ProfilePage'));

const App: FC = () => {
  useFirestoreChangesListener();

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

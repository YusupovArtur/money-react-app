// React imports
import { FC, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
// Components imports
import { Navbar } from 'widgets/Navbar';
import { AppWrapper } from 'app/AppWrapper';
import { useFirestoreChangesListener } from 'app/useFirestoreChangesListener.ts';
import { PageLoadingSpinner } from 'shared/ui';
// Pages
const MainPage = lazy(() => import('pages/MainPage'));
const TransactionsPage = lazy(() => import('pages/TransactionsPage'));
const WalletsPage = lazy(() => import('pages/WalletsPage'));
const CategoriesPage = lazy(() => import('pages/CategoriesPage'));
const LoginPage = lazy(() => import('pages/LoginPage'));
const ProfilePage = lazy(() => import('pages/ProfilePage'));

export const App: FC = () => {
  useFirestoreChangesListener();

  return (
    <AppWrapper>
      <Navbar />
      <Suspense fallback={<PageLoadingSpinner />}>
        <Routes>
          <Route path="/" Component={MainPage} />
          <Route path="/transactions" Component={TransactionsPage} />
          <Route path="/wallets" Component={WalletsPage} />
          <Route path="/categories" Component={CategoriesPage} />
          <Route path="/login" Component={LoginPage} />
          <Route path="/profile" Component={ProfilePage} />
        </Routes>
      </Suspense>
    </AppWrapper>
  );
};

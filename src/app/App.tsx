// React
import { FC, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
// Hooks
import { useFirestoreListener } from 'store/listener';
// Components
import { AppWrapper } from 'app/AppWrapper';
import { Navbar } from 'widgets/Navbar';
import { PageLoadingSpinner } from 'shared/ui';
// Pages
const MainPage = lazy(() => import('pages/MainPage'));
const TransactionsPage = lazy(() => import('pages/TransactionsPage'));
const WalletsPage = lazy(() => import('pages/WalletsPage'));
const CategoriesPage = lazy(() => import('pages/CategoriesPage'));
const LoginPage = lazy(() => import('pages/LoginPage'));
const ProfilePage = lazy(() => import('pages/ProfilePage'));

const App: FC = () => {
  useFirestoreListener();

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

export default App;
